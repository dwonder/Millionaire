import { TableClient } from '@azure/data-tables';
import fs from 'fs';
import path from 'path';

export interface LeaderboardEntity {
  partitionKey: string;
  rowKey: string;
  playerName: string;
  score: string;
  scoreValue: number;
  questionLevel: number;
  isWinner: boolean;
  date: string;
  title: string;
  attempts?: number;
}

const DEFAULT_TABLE_NAME = process.env.AZURE_TABLE_NAME || 'CyberMillionaireLeaderboard';
const CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || '';

// Fallback persistence file in case Azure connection string is not provided
const LOCAL_DATA_FILE = path.resolve(process.cwd(), '.azure_leaderboard_data.json');

// Initial seed champions representing top cybersecurity defenders with attempts count
const DEFAULT_SEED_DATA: LeaderboardEntity[] = [
  {
    partitionKey: 'Leaderboard',
    rowKey: 'seed_01',
    playerName: 'Sarah Connor',
    score: '€1,000,000',
    scoreValue: 1000000,
    questionLevel: 15,
    isWinner: true,
    date: new Date(Date.now() - 3600000 * 4).toISOString(),
    title: 'Cybersecurity Millionaire',
    attempts: 4,
  },
  {
    partitionKey: 'Leaderboard',
    rowKey: 'seed_02',
    playerName: 'Alex Mercer',
    score: '€500,000',
    scoreValue: 500000,
    questionLevel: 14,
    isWinner: false,
    date: new Date(Date.now() - 3600000 * 12).toISOString(),
    title: 'Security Architect',
    attempts: 6,
  },
  {
    partitionKey: 'Leaderboard',
    rowKey: 'seed_03',
    playerName: 'Elena Rostova',
    score: '€250,000',
    scoreValue: 250000,
    questionLevel: 13,
    isWinner: false,
    date: new Date(Date.now() - 3600000 * 24).toISOString(),
    title: 'Security Champion',
    attempts: 3,
  },
  {
    partitionKey: 'Leaderboard',
    rowKey: 'seed_04',
    playerName: 'Marcus Vance',
    score: '€125,000',
    scoreValue: 125000,
    questionLevel: 12,
    isWinner: false,
    date: new Date(Date.now() - 3600000 * 36).toISOString(),
    title: 'Zero Trust Specialist',
    attempts: 8,
  },
  {
    partitionKey: 'Leaderboard',
    rowKey: 'seed_05',
    playerName: 'David Chen',
    score: '€64,000',
    scoreValue: 64000,
    questionLevel: 11,
    isWinner: false,
    date: new Date(Date.now() - 3600000 * 48).toISOString(),
    title: 'SOC Lead Defender',
    attempts: 5,
  },
  {
    partitionKey: 'Leaderboard',
    rowKey: 'seed_06',
    playerName: 'Priya Patel',
    score: '€32,000',
    scoreValue: 32000,
    questionLevel: 10,
    isWinner: false,
    date: new Date(Date.now() - 3600000 * 60).toISOString(),
    title: 'Data Defender',
    attempts: 2,
  },
  {
    partitionKey: 'Leaderboard',
    rowKey: 'seed_07',
    playerName: 'Jordan Taylor',
    score: '€16,000',
    scoreValue: 16000,
    questionLevel: 9,
    isWinner: false,
    date: new Date(Date.now() - 3600000 * 72).toISOString(),
    title: 'Incident Responder',
    attempts: 7,
  },
  {
    partitionKey: 'Leaderboard',
    rowKey: 'seed_08',
    playerName: 'Samira Khan',
    score: '€8,000',
    scoreValue: 8000,
    questionLevel: 8,
    isWinner: false,
    date: new Date(Date.now() - 3600000 * 84).toISOString(),
    title: 'IAM Specialist',
    attempts: 4,
  },
  {
    partitionKey: 'Leaderboard',
    rowKey: 'seed_09',
    playerName: 'Liam O\'Connor',
    score: '€4,000',
    scoreValue: 4000,
    questionLevel: 7,
    isWinner: false,
    date: new Date(Date.now() - 3600000 * 96).toISOString(),
    title: 'Network Guard',
    attempts: 3,
  },
  {
    partitionKey: 'Leaderboard',
    rowKey: 'seed_10',
    playerName: 'Chloe Bennett',
    score: '€2,000',
    scoreValue: 2000,
    questionLevel: 6,
    isWinner: false,
    date: new Date(Date.now() - 3600000 * 108).toISOString(),
    title: 'Phish Fighter',
    attempts: 1,
  },
];

class AzureLeaderboardService {
  private client: TableClient | null = null;
  private isAzureConnected: boolean = false;
  private tableName: string = DEFAULT_TABLE_NAME;
  private inMemoryEntities: LeaderboardEntity[] = [];

  constructor() {
    this.initLocalFallback();
    this.initAzureClient();
  }

  private initLocalFallback() {
    try {
      if (fs.existsSync(LOCAL_DATA_FILE)) {
        const raw = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.inMemoryEntities = parsed.map((e, idx) => ({
            ...e,
            attempts: e.attempts || DEFAULT_SEED_DATA[idx]?.attempts || 1,
          }));
        } else {
          this.inMemoryEntities = [...DEFAULT_SEED_DATA];
          this.saveLocalFile();
        }
      } else {
        this.inMemoryEntities = [...DEFAULT_SEED_DATA];
        this.saveLocalFile();
      }
    } catch (err) {
      this.inMemoryEntities = [...DEFAULT_SEED_DATA];
    }
  }

  private saveLocalFile() {
    try {
      fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(this.inMemoryEntities, null, 2), 'utf-8');
    } catch (err) {
      console.error('[AzureLeaderboard] Failed to save local cache file:', err);
    }
  }

  private async initAzureClient() {
    if (!CONNECTION_STRING) {
      this.isAzureConnected = false;
      return;
    }

    try {
      this.client = TableClient.fromConnectionString(CONNECTION_STRING, this.tableName);
      await this.client.createTable();
      this.isAzureConnected = true;

      const entitiesIterator = this.client.listEntities();
      let count = 0;
      for await (const _ of entitiesIterator) {
        count++;
        if (count >= 1) break;
      }

      if (count === 0) {
        for (const seed of DEFAULT_SEED_DATA) {
          await this.client.createEntity(seed);
        }
      }
    } catch (error: any) {
      this.isAzureConnected = Boolean(this.client);
    }
  }

  public async getTopScores(limit: number = 10): Promise<LeaderboardEntity[]> {
    let allEntities: LeaderboardEntity[] = [];

    if (this.isAzureConnected && this.client) {
      try {
        const iterator = this.client.listEntities<LeaderboardEntity>();
        for await (const entity of iterator) {
          allEntities.push({
            partitionKey: entity.partitionKey || 'Leaderboard',
            rowKey: entity.rowKey || '',
            playerName: entity.playerName || 'Anonymous Agent',
            score: entity.score || '€0',
            scoreValue: Number(entity.scoreValue) || 0,
            questionLevel: Number(entity.questionLevel) || 0,
            isWinner: Boolean(entity.isWinner),
            date: entity.date || new Date().toISOString(),
            title: entity.title || '',
            attempts: Number(entity.attempts) || 1,
          });
        }
      } catch (azureErr) {
        allEntities = [...this.inMemoryEntities];
      }
    } else {
      allEntities = [...this.inMemoryEntities];
    }

    // Sort descending by scoreValue, then questionLevel, then most recent date
    allEntities.sort((a, b) => {
      if (b.scoreValue !== a.scoreValue) {
        return b.scoreValue - a.scoreValue;
      }
      if (b.questionLevel !== a.questionLevel) {
        return b.questionLevel - a.questionLevel;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return allEntities.slice(0, limit);
  }

  public async addScore(entry: Omit<LeaderboardEntity, 'partitionKey' | 'rowKey'>): Promise<{
    saved: LeaderboardEntity;
    rank: number;
    isTop10: boolean;
    top10: LeaderboardEntity[];
    attempts: number;
  }> {
    const cleanName = (entry.playerName || 'Cyber Agent').trim();
    const existingIndex = this.inMemoryEntities.findIndex(
      (e) => e.playerName.toLowerCase() === cleanName.toLowerCase()
    );

    let calculatedAttempts = 1;
    let targetEntity: LeaderboardEntity;

    if (existingIndex !== -1) {
      const existing = this.inMemoryEntities[existingIndex];
      calculatedAttempts = Math.max(
        (existing.attempts || 1) + 1,
        Number(entry.attempts) || (existing.attempts || 1) + 1
      );

      // If new score is higher or equal, upgrade their leaderboard record
      if (entry.scoreValue >= existing.scoreValue) {
        targetEntity = {
          ...existing,
          score: entry.score,
          scoreValue: entry.scoreValue,
          questionLevel: entry.questionLevel,
          isWinner: entry.isWinner,
          date: entry.date || new Date().toISOString(),
          title: entry.title || existing.title,
          attempts: calculatedAttempts,
        };
        this.inMemoryEntities[existingIndex] = targetEntity;
      } else {
        // Keep existing personal best, but increment total attempts
        targetEntity = {
          ...existing,
          attempts: calculatedAttempts,
        };
        this.inMemoryEntities[existingIndex] = targetEntity;
      }
    } else {
      calculatedAttempts = Number(entry.attempts) || 1;
      const rowKey = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      targetEntity = {
        partitionKey: 'Leaderboard',
        rowKey,
        playerName: cleanName,
        score: entry.score || '€0',
        scoreValue: Number(entry.scoreValue) || 0,
        questionLevel: Number(entry.questionLevel) || 0,
        isWinner: Boolean(entry.isWinner),
        date: entry.date || new Date().toISOString(),
        title: entry.title || '',
        attempts: calculatedAttempts,
      };
      this.inMemoryEntities.push(targetEntity);
    }

    if (this.isAzureConnected && this.client) {
      try {
        await this.client.upsertEntity(targetEntity, 'Replace');
      } catch (azureErr) {
        console.error('[AzureLeaderboard] Error upserting into Azure Table Storage:', azureErr);
      }
    }

    this.saveLocalFile();

    const top10 = await this.getTopScores(10);
    const rankIndex = top10.findIndex((e) => e.playerName.toLowerCase() === cleanName.toLowerCase());
    const rank = rankIndex !== -1 ? rankIndex + 1 : -1;
    const isTop10 = rank > 0 && rank <= 10;

    return {
      saved: targetEntity,
      rank,
      isTop10,
      top10,
      attempts: calculatedAttempts,
    };
  }

  public getStatus() {
    return {
      connectedToAzure: this.isAzureConnected,
      storageType: this.isAzureConnected ? 'Azure Table Storage (Cloud)' : 'Azure Database Storage (Emulator / Cache)',
      tableName: this.tableName,
      totalRecords: this.inMemoryEntities.length,
      azureConfigured: Boolean(CONNECTION_STRING),
    };
  }

  public resetToDefaults(): LeaderboardEntity[] {
    this.inMemoryEntities = [...DEFAULT_SEED_DATA];
    this.saveLocalFile();
    return this.inMemoryEntities.slice(0, 10);
  }
}

export const azureLeaderboardService = new AzureLeaderboardService();
