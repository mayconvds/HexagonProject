using HEXAGON.Communication.Request;
using HEXAGON.Communication.Response;

namespace HEXAGON.Application.UseCases.User.Register;

public interface IRegisterUserUseCase
{
    Task<ResponseUserJson> Execute(RequestRegisterUserJson request);
}