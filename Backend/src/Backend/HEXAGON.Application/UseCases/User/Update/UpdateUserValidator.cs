using FluentValidation;
using HEXAGON.Communication.Request;
using HEXAGON.Exceptions;

namespace HEXAGON.Application.UseCases.User.Update;

public class UpdateUserValidator : AbstractValidator<RequestUpdateUserJson>
{
    public UpdateUserValidator()
    {
        RuleFor(c => c.name).NotEmpty().WithMessage(ResourceErrorsMessages.EMPTY_NAME);
        RuleFor(c => c.age).NotEmpty().WithMessage(ResourceErrorsMessages.EMPTY_AGE);
        RuleFor(c => c.civil_status).NotEmpty().WithMessage(ResourceErrorsMessages.CITY_STATUS);
        RuleFor(c => c.city).NotEmpty().WithMessage(ResourceErrorsMessages.CITY_STATUS);
        RuleFor(c => c.state).NotEmpty().WithMessage(ResourceErrorsMessages.STATE);
        RuleFor(c => c.document).NotEmpty().WithMessage(ResourceErrorsMessages.DOCUMENT_STATUS)
            .Length(11).WithMessage(ResourceErrorsMessages.DOCUMENT_VALIDATE);
    }
}