using HEXAGON.Domain.Entities;

namespace HEXAGON.Domain.Repositories;

public interface IUserDeleteRepository
{
    Task Delete(Users user);
}