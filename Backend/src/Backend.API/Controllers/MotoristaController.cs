using System;
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
    public async Task<ActionResult<MotoristaResponse>> Add([FromBody] MotoristaRequest request)
    {
        try
        {
            var result = await _motoristaService.Save(request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<MotoristaResponse>> Edit(int id, [FromBody] MotoristaRequest request)
    {
        try
        {
            var result = await _motoristaService.Edit(id, request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpPost("{id}/folga")]
    public async Task<ActionResult> AddFolga(int id, [FromBody] MotoristaFolgaRequest request)
    {
        try
        {
            await _motoristaService.AddFolga(id, request);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}