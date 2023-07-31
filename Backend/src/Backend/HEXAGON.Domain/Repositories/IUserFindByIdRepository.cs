using HEXAGON.Domain.Entities;

namespace HEXAGON.Domain.Repositories;

public interface IUserFindByIdRepository
{
    Task<Users> GetUserById(int id);
}
