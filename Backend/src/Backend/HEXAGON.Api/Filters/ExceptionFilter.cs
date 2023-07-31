using HEXAGON.Communication.Response;
using HEXAGON.Exceptions;
using HEXAGON.Exceptions.ExeptionBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace HEXAGON.Api.Filters;

public class ExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.Exception is HEXAGONException)
        {
            DoCheckLatamException(context);
        } else
        {
            ThrowUnknownError(context);
        }
    }

    private void DoCheckLatamException(ExceptionContext context)
    {
        if (context.Exception is ErrorsValidatorException)
        {
            ThrowErrorsValidatorException(context);
        }
    }

    private void ThrowErrorsValidatorException(ExceptionContext context)
    {
        var execption  = context.Exception as ErrorsValidatorException;
        if (context.ActionDescriptor.DisplayName.Contains("Delete"))
        {
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.NotFound;
        } else
        {
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
        }
        
        context.Result = new ObjectResult(new ResponseErrorJson(execption.ErrorsMessage));
    }

    private void ThrowUnknownError(ExceptionContext context)
    {
        context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        context.Result = new ObjectResult(new ResponseErrorJson(ResourceErrorsMessages.UNKNOWN_ERROR));
    }
}