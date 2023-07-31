using HEXAGON.Communication.Request;
using HEXAGON.Communication.Response;
using HEXAGON.Domain.Repositories;
using HEXAGON.Exceptions.ExeptionBase;

namespace HEXAGON.Application.UseCases.User.Update;

public class UpdateUserUseCase : IUpdateUserUseCase
{
    private readonly IUserFindByIdRepository _userFindByIdRepository;
    private readonly IUserUpdateRepository _userUpdateRepository;
    public UpdateUserUseCase(IUserFindByIdRepository userFindByIdRepository,
        IUserUpdateRepository userUpdateRepository)
    {
        _userFindByIdRepository = userFindByIdRepository;
        _userUpdateRepository = userUpdateRepository;
    }
    public async Task<ResponseUserJson> ExecuteUpdate(int id, RequestUpdateUserJson request)
    {
        var validator = new UpdateUserValidator();
        var result = validator.Validate(request);

        var user = await _userFindByIdRepository.GetUserById(id);
        if (user == null)
        {
            result.Errors.Add(new FluentValidation.Results.ValidationFailure("message", "Usuário não encontrado!"));
        }

        if (!result.IsValid)
        {
            var errorsMessage = result.Errors.Select(error => error.ErrorMessage).ToList();
            throw new ErrorsValidatorException(errorsMessage);
        }

        user.name = request.name;
        user.age = request.age;
        user.civil_status = request.civil_status;
        user.document = request.document;
        user.city = request.city;
        user.state = request.state;

        await _userUpdateRepository.Update(user);

        return new ResponseUserJson
        {
            message = "Cadastro alterado com sucesso!"
        };
    }

}
