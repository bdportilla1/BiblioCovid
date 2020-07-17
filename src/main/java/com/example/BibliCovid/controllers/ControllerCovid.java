package com.example.BibliCovid.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ControllerCovid {

	
	
	@RequestMapping("/")
	public String home(Model model) {
		String vista="index";
		return vista;
	}
	
	
	@RequestMapping("/publicaciones")
	public String punlicaciones(Model model) {
		String vista="publicaciones";
		return vista;
	}
	
	@RequestMapping("/graficas")
	public String graficas(Model model) {
		String vista="graficas";
		return vista;
	}

	@RequestMapping("/WordCloud")
	public String chartWordCloud(Model model) {
		String vista="chartWordCloud";
		return vista;
	}

	@RequestMapping("/nodos")
	public String nodos(Model model) {
		String vista="chartNodos";
		return vista;
	}

	@RequestMapping("/public2")
	public String public2(Model model) {
		String vista="publicdata";
		return vista;
	}
}

