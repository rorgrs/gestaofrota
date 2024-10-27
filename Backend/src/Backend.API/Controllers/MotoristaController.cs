using System;
using Backend.Domain.DTOs;
using Backend.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domain.DTOs.Motorista;

namespace Backend.API.Controllers;

[ApiController]
[Route("[controller]")]
public class MotoristaController : ControllerBase
{
    private readonly IMotoristaService _motoristaService;

    public MotoristaController(IMotoristaService motoristaService)
    {
        _motoristaService = motoristaService;
    }

    [HttpGet]
    public async Task<ActionResult<List<MotoristaResponse>>> GetAll()
    {
        try
        {
            var result = await _motoristaService.GetAll();
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MotoristaResponse>> Get(int id)
    {
        try
        {
            var result = await _motoristaService.Get(id);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult<MotoristaResponse>> Save([FromBody] MotoristaRequest request)
    {try
        {
            var result = await _motoristaService.Save(request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}