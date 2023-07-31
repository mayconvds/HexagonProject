using HEXAGON.Domain.Entities;

namespace HEXAGON.Domain.Repositories;

public interface IWorkUnity
{
    Task Commit();
}