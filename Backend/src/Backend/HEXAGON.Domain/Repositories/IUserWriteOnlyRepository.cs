using HEXAGON.Domain.Entities;

namespace HEXAGON.Domain.Repositories;

public interface IUserWriteOnlyRepository
{
    Task Add(Users user);
}