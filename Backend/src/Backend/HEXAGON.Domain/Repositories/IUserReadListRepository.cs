using HEXAGON.Domain.Entities;

namespace HEXAGON.Domain.Repositories;

public interface IUserReadListRepository
{
    Task<List<Users>> ListUsers();
}