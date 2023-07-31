using HEXAGON.Domain.Entities;

namespace HEXAGON.Domain.Repositories;
public interface IUserReadOnlyRepository
{
    Task<bool> HasExistWithDocument(string document);
 }
