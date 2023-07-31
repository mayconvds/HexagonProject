namespace HEXAGON.Communication.Response;

public class ResponseErrorJson
{
    public List<string> Message  { get; set; }

    public ResponseErrorJson(string message)
    {
        Message = new List<string> { message };
    }

    public ResponseErrorJson(List<string> messages)
    {
        Message = messages;
    }
}