import { TestBed } from '@angular/core/testing';

import { FolderStructureService } from './folder-structure.service';

describe('FolderStructureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FolderStructureService = TestBed.get(FolderStructureService);
    expect(service).toBeTruthy();
  });
});
