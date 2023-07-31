using HEXAGON.Communication.Request;
using HEXAGON.Communication.Response;

namespace HEXAGON.Application.UseCases.User.Update;

public interface IUpdateUserUseCase
{
    Task<ResponseUserJson> ExecuteUpdate(int id, RequestUpdateUserJson request);
}
