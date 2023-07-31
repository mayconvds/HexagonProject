using AutoMapper;
using HEXAGON.Communication.Request;
using HEXAGON.Communication.Response;
using HEXAGON.Domain.Repositories;
using HEXAGON.Exceptions;
using HEXAGON.Exceptions.ExeptionBase;
using System.Data;

namespace HEXAGON.Application.UseCases.User.Register;

public class RegisterUserUseCase : IRegisterUserUseCase
{
    private readonly IUserWriteOnlyRepository _repository;
    private readonly IMapper _mapper;
    private readonly IWorkUnity _workUnity;
    private readonly IUserReadOnlyRepository _userReadOnlyRepository;

    public RegisterUserUseCase(IUserWriteOnlyRepository repository, IMapper mapper, IWorkUnity workUnity,
        IUserReadOnlyRepository userReadOnlyRepository)
    {
        _repository = repository;
        _mapper = mapper;
        _workUnity = workUnity;
        _userReadOnlyRepository = userReadOnlyRepository;
    }
    public async Task<ResponseUserJson> Execute(RequestRegisterUserJson request)
    {
        await Validate(request);

        var entity = _mapper.Map<Domain.Entities.Users>(request);

        await _repository.Add(entity);

        await _workUnity.Commit();
        return new ResponseUserJson
        {
            message = "Cadastro realizado com sucesso!"
        };
    }

    private async Task Validate(RequestRegisterUserJson request)
    {
        var validator = new RegisterUserValidator();
        var result = validator.Validate(request);

        var checkDocument = await _userReadOnlyRepository.HasExistWithDocument(request.document);
        if (checkDocument)
        {
            result.Errors.Add(new FluentValidation.Results.ValidationFailure("message", ResourceErrorsMessages.DOCUMENT_EXIST));
        }

        if (!result.IsValid)
        {
            var errorsMessage = result.Errors.Select(error => error.ErrorMessage).ToList();
            throw new ErrorsValidatorException(errorsMessage);
        }
    }
}