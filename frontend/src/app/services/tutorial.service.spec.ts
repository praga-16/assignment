import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TutorialService } from './tutorial.service';
import { Tutorial } from '../models/tutorial.model';

describe('TutorialService', () => {
  let service: TutorialService;
  let httpMock: HttpTestingController;
  const baseUrl = '/api/tutorials';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TutorialService]
    });

    service = TestBed.inject(TutorialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all tutorials', () => {
    const dummyTutorials: Tutorial[] = [
      { id: '1', title: 'Test 1', description: 'Desc 1', published: false },
      { id: '2', title: 'Test 2', description: 'Desc 2', published: true }
    ];

    service.getAll().subscribe(tutorials => {
      expect(tutorials.length).toBe(2);
      expect(tutorials).toEqual(dummyTutorials);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTutorials);
  });

  it('should create a tutorial', () => {
    const newTutorial = { title: 'New', description: 'Desc' };

    service.create(newTutorial).subscribe(res => {
      expect(res).toEqual(newTutorial);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTutorial);
    req.flush(newTutorial);
  });
});
