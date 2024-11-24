using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Infrastructure.Helpers.Interface;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Infrastructure.Helpers;

public class UserContext : IUserContext
{
    public int Id { get; set; }
    public string Documento { get; set; }
}