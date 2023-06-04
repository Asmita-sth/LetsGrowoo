/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Gallery.serviceService } from './gallery.service.service';

describe('Service: Gallery.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Gallery.serviceService]
    });
  });

  it('should ...', inject([Gallery.serviceService], (service: Gallery.serviceService) => {
    expect(service).toBeTruthy();
  }));
});
