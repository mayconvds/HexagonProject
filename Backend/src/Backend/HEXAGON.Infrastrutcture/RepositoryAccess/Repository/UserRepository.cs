using HEXAGON.Domain.Entities;
using HEXAGON.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace LATAM.Infrastructure.RepositoryAccess;

public class UserRepository : IUserReadOnlyRepository, IUserWriteOnlyRepository, IUserReadListRepository, IUserFindByIdRepository, IUserUpdateRepository, IUserDeleteRepository
{
    private readonly LATAMContext _context;
    public UserRepository(LATAMContext context)
    {
        _context = context;
    }

    public async Task Add(Users user)
    {
        await _context.User.AddAsync(user);
    }

    public async Task<Users> GetUserById(int id)
    {
        return await _context.User.FirstOrDefaultAsync(c => c.id == id);
    }

    public async Task<bool> HasExistWithDocument(string document)
    {
        return await _context.User.AnyAsync(c => c.document.Equals(document));
    }

    public async Task<List<Users>> ListUsers()
    {
        List<Users> list = await _context.User.AsNoTracking().ToListAsync();
        return list;
    }

    public async Task Update(Users user)
    {
       _context.User.Entry(user).State = EntityState.Modified;
       await _context.SaveChangesAsync();
    }

    public async Task Delete(Users user)
    {
        _context.User.Remove(user);
        await _context.SaveChangesAsync(true);
    }

}