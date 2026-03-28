import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LogEntry {
  timestamp: string;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  source: string;
  message: string;
  metadata?: Record<string, any>;
  correlationId?: string;
  userAgent?: string;
  url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private logBuffer: LogEntry[] = [];
  private bufferSize = 10;
  private remoteLogUrl = 'http://127.0.0.1:3000/logs';
  private correlationId: string;

  constructor(private http: HttpClient) {
    this.correlationId = this.generateCorrelationId();
  }

  debug(source: string, message: string, metadata?: Record<string, any>): void {
    this.log('DEBUG', source, message, metadata);
  }

  info(source: string, message: string, metadata?: Record<string, any>): void {
    this.log('INFO', source, message, metadata);
  }

  warn(source: string, message: string, metadata?: Record<string, any>): void {
    this.log('WARN', source, message, metadata);
  }

  error(source: string, message: string, metadata?: Record<string, any>): void {
    this.log('ERROR', source, message, metadata);
  }

  private log(level: LogEntry['level'], source: string, message: string, metadata?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      source,
      message,
      metadata,
      correlationId: this.correlationId,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    // Console output with structured format
    const consoleMsg = `[${entry.timestamp}] [${level}] [${source}] ${message}`;
    switch (level) {
      case 'DEBUG':
        console.debug(consoleMsg, metadata || '');
        break;
      case 'INFO':
        console.info(consoleMsg, metadata || '');
        break;
      case 'WARN':
        console.warn(consoleMsg, metadata || '');
        break;
      case 'ERROR':
        console.error(consoleMsg, metadata || '');
        break;
    }

    // Buffer for remote logging
    this.logBuffer.push(entry);
    if (this.logBuffer.length >= this.bufferSize) {
      this.flush();
    }
  }

  flush(): void {
    if (this.logBuffer.length === 0) return;

    const logsToSend = [...this.logBuffer];
    this.logBuffer = [];

    this.http.post(this.remoteLogUrl, { logs: logsToSend }).subscribe({
      error: () => {
        // Silent fail for remote logging - don't break the app
      },
    });
  }

  private generateCorrelationId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getCorrelationId(): string {
    return this.correlationId;
  }

  resetCorrelationId(): void {
    this.correlationId = this.generateCorrelationId();
  }
}
