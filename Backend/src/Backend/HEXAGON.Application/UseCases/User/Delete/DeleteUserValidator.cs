using FluentValidation;

namespace HEXAGON.Application.UseCases.User.Delete;

public class DeleteUserValidator : AbstractValidator<int>
{
    public DeleteUserValidator()
    {
        RuleFor(id => id)
            .GreaterThan(0)
            .WithMessage("ID inválido.");
    }
}
