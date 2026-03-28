import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  let service: LoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a correlation ID', () => {
    const id = service.getCorrelationId();
    expect(id).toBeTruthy();
    expect(id.length).toBe(36);
  });

  it('should reset correlation ID', () => {
    const originalId = service.getCorrelationId();
    service.resetCorrelationId();
    const newId = service.getCorrelationId();
    expect(newId).not.toBe(originalId);
  });

  it('should log info messages to console', () => {
    spyOn(console, 'info');
    service.info('TestSource', 'Test message');
    expect(console.info).toHaveBeenCalled();
  });

  it('should log error messages to console', () => {
    spyOn(console, 'error');
    service.error('TestSource', 'Error message');
    expect(console.error).toHaveBeenCalled();
  });

  it('should log warn messages to console', () => {
    spyOn(console, 'warn');
    service.warn('TestSource', 'Warning message');
    expect(console.warn).toHaveBeenCalled();
  });

  it('should log debug messages to console', () => {
    spyOn(console, 'debug');
    service.debug('TestSource', 'Debug message');
    expect(console.debug).toHaveBeenCalled();
  });

  it('should include metadata in log output', () => {
    spyOn(console, 'info');
    const metadata = { key: 'value' };
    service.info('TestSource', 'Test', metadata);
    expect(console.info).toHaveBeenCalledWith(jasmine.any(String), metadata);
  });
});
