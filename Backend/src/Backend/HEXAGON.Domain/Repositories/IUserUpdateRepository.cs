using HEXAGON.Domain.Entities;

namespace HEXAGON.Domain.Repositories;

public interface IUserUpdateRepository
{
    Task Update(Users user);
}