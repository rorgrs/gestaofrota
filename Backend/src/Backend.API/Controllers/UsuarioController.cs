using System;
using Backend.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.API.Middlewares;
using Backend.Domain.DTOs.Usuario;
using Microsoft.AspNetCore.Authorization;

namespace Backend.API.Controllers;

[ApiController]
[Route("[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioService _usuarioService;

    public UsuarioController(IUsuarioService usuarioService)
    {
        _usuarioService = usuarioService;
    }

    [ValidateToken]
    [HttpGet]
    public async Task<ActionResult<List<UsuarioResponse>>> GetAll()
    {
        try
        {
            var result = await _usuarioService.GetAll();
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [ValidateToken]
    [HttpGet("{id}")]
    public async Task<ActionResult<UsuarioResponse>> Get(int id)
    {
        try
        {
            var result = await _usuarioService.Get(id);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [ValidateToken]
    [HttpPost]
    public async Task<ActionResult<UsuarioResponse>> Save([FromBody] UsuarioRequest request)
    {
        try
        {
            var result = await _usuarioService.Save(request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [ValidateToken]
    [HttpPut("{id}")]
    public async Task<ActionResult<UsuarioResponse>> Edit(int id, [FromBody] UsuarioRequest request)
    {
        try
        {
            var result = await _usuarioService.Edit(id, request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UsuarioLoginResponse>> Login([FromBody] UsuarioLoginRequest request)
    {
        try
        {
            var result = await _usuarioService.Login(request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [ValidateToken]
    [HttpGet("login")]
    public ActionResult ValidateLogin()
    {
        try
        {
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}