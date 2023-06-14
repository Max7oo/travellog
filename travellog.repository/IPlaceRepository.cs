﻿using travellog.models;

namespace travellog.repository;

public interface IPlaceRepository
{
    IEnumerable<Place> GetAll();
    Place GetById(int id);
    Place Add(Place place);
    bool Update(Place place);
    bool Delete(int id);
}