namespace HEXAGON.Exceptions.ExeptionBase;
public class ErrorsValidatorException : HEXAGONException
{
    public List<string> ErrorsMessage { get; set; }

    public ErrorsValidatorException(List<string> messages) : base(string.Empty)
    {
        ErrorsMessage = messages;
    }
}