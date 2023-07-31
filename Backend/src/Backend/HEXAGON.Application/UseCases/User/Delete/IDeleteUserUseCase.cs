using HEXAGON.Communication.Response;

namespace HEXAGON.Application.UseCases.User.Delete;

public interface IDeleteUserUseCase
{
    Task<ResponseUserJson> ExecuteDelete(int id);
}
