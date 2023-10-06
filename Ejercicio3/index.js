function test(elemento, respuesta)
{
    if(elemento == "test1")
    {
        if(respuesta)
        {
            document.getElementById(elemento).style.backgroundColor = "green";
        }
        else
        {
            document.getElementById(elemento).style.backgroundColor = "red";
        }
    }
    else if(elemento == "test2")
    {
        if(!respuesta)
        {
            document.getElementById(elemento).style.backgroundColor = "green";
        }
        else
        {
            document.getElementById(elemento).style.backgroundColor = "red";
        }
    }
    else if(elemento == "test3")
    {
        if(respuesta)
        {
            document.getElementById(elemento).style.backgroundColor = "green";
        }
        else
        {
            document.getElementById(elemento).style.backgroundColor = "red";
        }
    }
    else if(elemento == "test4")
    {
        if(respuesta)
        {
            document.getElementById(elemento).style.backgroundColor = "green";
        }
        else
        {
            document.getElementById(elemento).style.backgroundColor = "red";
        }
    }
    else if(elemento == "test5")
    {
        if(respuesta)
        {
            document.getElementById(elemento).style.backgroundColor = "green";
        }
        else
        {
            document.getElementById(elemento).style.backgroundColor = "red";
        }
    }
    else if(elemento == "test6")
    {
        if(!respuesta)
        {
            document.getElementById(elemento).style.backgroundColor = "green";
        }
        else
        {
            document.getElementById(elemento).style.backgroundColor = "red";
        }
    }
    else{
        if(!respuesta)
        {
            document.getElementById(elemento).style.backgroundColor = "green";
        }
        else
        {
            document.getElementById(elemento).style.backgroundColor = "red";
        }
    }
}