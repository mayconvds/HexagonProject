using HEXAGON.Communication.Response;
using HEXAGON.Domain.Repositories;
using HEXAGON.Exceptions.ExeptionBase;

namespace HEXAGON.Application.UseCases.User.Delete;

public class DeleteUserCase : IDeleteUserUseCase
{
    private readonly IUserFindByIdRepository _userFindByIdRepository;
    private readonly IUserDeleteRepository _userDeleteRepository;

    public DeleteUserCase(IUserFindByIdRepository userFindByIdRepository,
        IUserDeleteRepository userDeleteRepository)
    {
        _userFindByIdRepository = userFindByIdRepository;
        _userDeleteRepository = userDeleteRepository;
    }

    public async Task<ResponseUserJson> ExecuteDelete(int id)
    {
        var validator = new DeleteUserValidator();
        var result = validator.Validate(id);

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

        await _userDeleteRepository.Delete(user);

        return new ResponseUserJson
        {
            message = "Registro deletado com sucesso!"
        };
    }
}