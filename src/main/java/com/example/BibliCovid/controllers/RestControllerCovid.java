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
	
	// Query obtener recursos con sus autores
				@GetMapping("/autores")
				//public List<HashMap<String, String>> autores() throws InterruptedException, ExecutionException{
				public List<HashMap<String, String>> autores() throws InterruptedException, ExecutionException{
					RDFInicializador obj = new RDFInicializador();
					RepositoryConnection repositoryConnection = obj.getRepositoryConnection();
					return RDFInicializador.queryAutores(repositoryConnection);
				}
				
		// Query obtener lenguajes y cantidad de articulos
		@GetMapping("/conteo")
		public List<HashMap<String, String>> conteo() throws InterruptedException, ExecutionException{
			RDFInicializador obj = new RDFInicializador();
			RepositoryConnection repositoryConnection = obj.getRepositoryConnection();
			return RDFInicializador.queryConteo(repositoryConnection);
		}
		@GetMapping("/sourceConteo")
		public List<HashMap<String, String>> sourceConteo() throws InterruptedException, ExecutionException{
			RDFInicializador obj = new RDFInicializador();
			RepositoryConnection repositoryConnection = obj.getRepositoryConnection();
			return RDFInicializador.queryConteoSource(repositoryConnection);
		}
	
	
	// Query obtener lenguajes y cantidad de articulos
			@GetMapping("/lenguages")
			public List<HashMap<String, String>> lenguages() throws InterruptedException, ExecutionException{
				RDFInicializador obj = new RDFInicializador();
				RepositoryConnection repositoryConnection = obj.getRepositoryConnection();
				return RDFInicializador.queryLenguajes(repositoryConnection);
			}
	
	
	// Query obtener los scholary work: anio, tipo, lenguage, numcitas
		@GetMapping("/scholary_works")
		public List<HashMap<String, String>> scholary_works() throws InterruptedException, ExecutionException{
			RDFInicializador obj = new RDFInicializador();
			RepositoryConnection repositoryConnection = obj.getRepositoryConnection();
			return RDFInicializador.queryRecursos(repositoryConnection);
		}
	
	
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
	

	@GetMapping("/q3")
	public List<HashMap<String, String>> q3() throws InterruptedException, ExecutionException{
		RDFInicializador obj = new RDFInicializador();
		RepositoryConnection repositoryConnection = obj.getRepositoryConnection();
		return RDFInicializador.query3(repositoryConnection);
	}

	@GetMapping("/ranks")
	public List<HashMap<String, String>> ranks() throws InterruptedException, ExecutionException{
		RDFInicializador obj = new RDFInicializador();
		RepositoryConnection repositoryConnection = obj.getRepositoryConnection();
		return RDFInicializador.query4(repositoryConnection);
	}

}
