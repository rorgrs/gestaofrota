using System;
using Backend.Domain.DTOs;
using Backend.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs.Veiculo;

namespace Backend.API.Controllers;

[ApiController]
[Route("[controller]")]
public class VeiculoController : ControllerBase
{
    private readonly IVeiculoService _VeiculoService;

    public VeiculoController(IVeiculoService VeiculoService)
    {
        _VeiculoService = VeiculoService;
    }

    [HttpGet]
    public async Task<ActionResult<List<VeiculoResponse>>> GetAll()
    {
        try
        {
            var result = await _VeiculoService.GetAll();
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<VeiculoResponse>> Get(int id)
    {
        try
        {
            var result = await _VeiculoService.Get(id);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<VeiculoResponse>> Save([FromBody] VeiculoRequest request)
    {try
        {
            var result = await _VeiculoService.Save(request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}