using System.Net;

namespace Backend.Domain.Exceptions;

public class ConflictException : BaseException
{
    public ConflictException() : base(HttpStatusCode.Conflict)
    {
    }

    public ConflictException(string message) : base(HttpStatusCode.Conflict, message)
    {
    }
}
