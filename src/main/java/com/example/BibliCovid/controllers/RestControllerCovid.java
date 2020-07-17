package com.example.BibliCovid.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.eclipse.rdf4j.repository.RepositoryConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BibliCovid.services.RDFInicializador;


@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class RestControllerCovid {
	
	
	
	// Query obtener los nombres de los articulos y nombre de recursos
	@GetMapping("/q1")
	public List<HashMap<String, String>> q1() throws InterruptedException, ExecutionException{
		RDFInicializador obj = new RDFInicializador();
		RepositoryConnection repositoryConnection = obj.getRepositoryConnection();
		return RDFInicializador.query1(repositoryConnection);
	}
	
	// 
	@GetMapping("/qP")
	public List<HashMap<String, String>> qP() throws InterruptedException, ExecutionException{
		RDFInicializador obj = new RDFInicializador();
		RepositoryConnection repositoryConnection = obj.getRepositoryConnection();
		return RDFInicializador.queryPrincipal(repositoryConnection);
	}
	
	@GetMapping("/q2")
	public List<HashMap<String, String>> q2() throws InterruptedException, ExecutionException{
		RDFInicializador obj = new RDFInicializador();
		RepositoryConnection repositoryConnection = obj.getRepositoryConnection();
		return RDFInicializador.query2(repositoryConnection);
	}
	

	@GetMapping("/nodos")
	public List<HashMap<String, String>> nodos() throws InterruptedException, ExecutionException{
		RDFInicializador obj = new RDFInicializador();
		RepositoryConnection repositoryConnection = obj.getRepositoryConnection();
		return RDFInicializador.queryNodos(repositoryConnection);
	}

}
