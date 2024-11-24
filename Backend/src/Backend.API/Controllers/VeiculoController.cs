using System;
using Backend.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.API.Middlewares;
using Backend.Domain.DTOs.Veiculo;

namespace Backend.API.Controllers;

[ApiController]
[Route("[controller]")]
public class VeiculoController : ControllerBase
{
    private readonly IVeiculoService _veiculoService;

    public VeiculoController(IVeiculoService veiculoService)
    {
        _veiculoService = veiculoService;
    }

    [ValidateToken]
    [HttpGet]
    public async Task<ActionResult<List<VeiculoResponse>>> GetAll()
    {
        try
        {
            var result = await _veiculoService.GetAll();
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [ValidateToken]
    [HttpGet("{id}")]
    public async Task<ActionResult<VeiculoResponse>> Get(int id)
    {
        try
        {
            var result = await _veiculoService.Get(id);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [ValidateToken]
    [HttpPost]
    public async Task<ActionResult<VeiculoResponse>> Save([FromBody] VeiculoRequest request)
    {
        try
        {
            var result = await _veiculoService.Save(request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
    
    [ValidateToken]
    [HttpPut("{id}")]
    public async Task<ActionResult<VeiculoResponse>> Edit(int id, [FromBody] VeiculoRequest request)
    {
        try
        {
            var result = await _veiculoService.Edit(id, request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [ValidateToken]
    [HttpPost("{id}/licenciamento")]
    public async Task<ActionResult> AddLicenciamento(int id, [FromBody] VeiculoLicenciamentoRequest request)
    {
        try
        {
            await _veiculoService.AddLicenciamento(id, request);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [ValidateToken]
    [HttpPost("{id}/manutencao")]
    public async Task<ActionResult> AddManutencao(int id, [FromBody] VeiculoManutencaoRequest request)
    {
        try
        {
            await _veiculoService.AddManutencao(id, request);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}