package com.example.BibliCovid.services;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.eclipse.rdf4j.model.impl.SimpleIRI;
import org.eclipse.rdf4j.model.impl.SimpleLiteral;
import org.eclipse.rdf4j.query.BindingSet;
import org.eclipse.rdf4j.query.QueryEvaluationException;
import org.eclipse.rdf4j.query.QueryLanguage;
import org.eclipse.rdf4j.query.TupleQuery;
import org.eclipse.rdf4j.query.TupleQueryResult;
import org.eclipse.rdf4j.query.Update;
import org.eclipse.rdf4j.repository.Repository;
import org.eclipse.rdf4j.repository.RepositoryConnection;
import org.eclipse.rdf4j.repository.http.HTTPRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;

public class RDFInicializador {
	
	private static Logger logger = LoggerFactory.getLogger(RDFInicializador.class);
// Why This Failure marker
	private static final Marker WTF_MARKER = MarkerFactory.getMarker("WTF");
// GraphDB 
	private static final String GRAPHDB_SERVER = "http://localhost:7200/";
	private static final String REPOSITORY_ID = "bcovid";

	
	private static String query_scholary_works;
	
	private static String query_lenguajes;
	
	private static String query_autores;
	
	
	
	private static String strQuery_Principal;
	private static String strQuery1;
	private static String strQuery2;
	private static String strQuery3;
	private static String strQuery4;
	private static String strQuery5;
	private static String strQuery6;
	
	private static String srtQueryNodos;
	


	public static RepositoryConnection getRepositoryConnection() {
		Repository repository = new HTTPRepository(GRAPHDB_SERVER, REPOSITORY_ID);
		repository.initialize();
		RepositoryConnection repositoryConnection = repository.getConnection();
		return repositoryConnection;
	}
	
	static {
		
		query_autores
		= "PREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\n" + 
				"PREFIX fabio: <http://purl.org/spar/fabio/>\r\n" + 
				"PREFIX dct: <http://purl.org/dc/terms/>\r\n" + 
				"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\n" + 
				"select DISTINCT ?recurso ?titulo ?autor WHERE {\r\n" + 
				"    ?recurso rdfs:subClassOf fabio:ScholaryWork ;\r\n" + 
				"             dct:title ?titulo;\r\n" + 
				"             dct:creator ?creador.\r\n" + 
				"    ?creador foaf:name ?autor.\r\n" + 
				"                }";
		
		// lenguajes y cantidad
		query_lenguajes
		="PREFIX fabio: <http://purl.org/spar/fabio/>\r\n" + 
				"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\n" + 
				"PREFIX dct: <http://purl.org/dc/terms/>\r\n" + 
				"SELECT DISTINCT ?lenguaje (count(*) AS ?cantidad) WHERE {\r\n" + 
				"    ?Recursos rdfs:subClassOf fabio:ScholaryWork;\r\n" + 
				"              dct:language ?lenguaje.\r\n" + 
				"} GROUP BY ?lenguaje";
		
		
		// Obtener scholary work = tipo. anio, lenguaje, numcitas
		query_scholary_works
		="PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\r\n" + 
				"PREFIX dct: <http://purl.org/dc/terms/>\r\n" + 
				"PREFIX myData: <http://utpl.edu.ec/COVIDBiblio/ontology/>\r\n" + 
				"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\n" + 
				"PREFIX fabio: <http://purl.org/spar/fabio/>\r\n" + 
				"select DISTINCT ?recurso ?titulo ?date ?lenguaje ?tipo ?numCitas where {\r\n" + 
				"    ?recurso rdfs:subClassOf fabio:ScholaryWork;\r\n" + 
				"        dct:title ?titulo;\r\n" + 
				"        dct:date ?date;\r\n" + 
				"    	dct:language ?lenguaje;\r\n" + 
				"        rdf:type ?tipo;\r\n" + 
				"    	myData:citationsCount ?numCitas\r\n" + 
				"} ";
		
		// Obtener todos los scholary works
		strQuery_Principal
		= "PREFIX onto: <http://www.ontotext.com/>"
                + "PREFIX fabio: <http://purl.org/spar/fabio/>"
                + "PREFIX dct: <http://purl.org/dc/terms/>"
                + "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
                + "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
                + "select DISTINCT ?Recursos ?titulo ?tipo WHERE {"
                + "?Recursos dct:title ?titulo ."
                + "?Recursos rdf:type ?tipo .  "
                + "?Recursos rdfs:subClassOf fabio:ScholaryWork ."
                + "}";
       
       
        // Obtener los recuros y los titulos de los Articulos
        strQuery1
                = "PREFIX onto: <http://www.ontotext.com/>"
                + "PREFIX fabio: <http://purl.org/spar/fabio/>"
                + "PREFIX dbr: <http://dbpedia.org/resource/>"
                + "PREFIX dct: <http://purl.org/dc/terms/>"
                + "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"
                + "select DISTINCT ?Recursos ?titulo WHERE {"
                + "?Recursos dct:title ?titulo ."
                + "?Recursos rdf:type fabio:Article . "
                + "}";
        
        // Obtener el tipo de documento y la cantidad en total de cada uno
        strQuery2
        		= "PREFIX fabio: <http://purl.org/spar/fabio/>"
				+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>"
				+ "PREFIX dbo: <http://dbpedia.org/ontology/>"
				+ "SELECT DISTINCT ?tipo (count(*) AS ?cantidad) WHERE {"
				+ "?Recursos rdfs:subClassOf fabio:ScholaryWork ."
				+ "?Recursos rdf:type ?tipo ."
                + "} GROUP BY ?tipo";

        // Obtener todos los recursos con su titulo y el creador
        strQuery3
                = "PREFIX foaf: <http://xmlns.com/foaf/0.1/>" +
                "PREFIX fabio: <http://purl.org/spar/fabio/>" +
                "PREFIX dct: <http://purl.org/dc/terms/>" +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" +
                "PREFIX schema: <https://schema.org/>" +
                "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>" +
                "select DISTINCT * WHERE {" +
                "    ?Recursos dct:title ?titulo ;" +
                "              rdf:type ?tipo ;" +
                "              dct:language ?language;" +
                "              dct:creator ?creador." +
                "    ?creador foaf:name ?nameCreador." +
                "}";



        // obtener todos los recursos que tengan un quartile y el pais
        strQuery4
                = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\r\n" + 
                		"PREFIX dcat: <http://www.w3.org/ns/dcat#>\r\n" + 
                		"PREFIX data: <http://opendata.org/resource/>\r\n" + 
                		"PREFIX foaf: <http://xmlns.com/foaf/0.1/>\r\n" + 
                		"PREFIX dct: <http://purl.org/dc/terms/>\r\n" + 
                		"PREFIX bido: <http://purl.org/spar/bido/>\r\n" + 
                		"PREFIX myData: <http://utpl.edu.ec/COVIDBiblio/ontology/>\r\n" + 
                		"PREFIX dbo: <http://dbpedia.org/ontology/>\r\n" + 
                		"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\r\n" + 
                		"PREFIX fabio: <http://purl.org/spar/fabio/>\r\n" + 
                		"	select DISTINCT ?Recurso ?tituloRecurso ?Source ?titulo ?country ?titleQuartile ?ValueRank ?ValueQuartile where { \r\n" + 
                		"    ?Recurso rdfs:subClassOf fabio:ScholaryWork;\r\n" + 
                		"             dct:title ?tituloRecurso;\r\n" + 
                		"             bido:withBibliometricData ?Source.\r\n" + 
                		"    ?Source dct:title ?titulo ;\r\n" + 
                		"              dbo:country ?country ;\r\n" + 
                		"               myData:rank ?ValueRank;\r\n" + 
                		"              bido:hasQuartile ?Quartile .\r\n" + 
                		"    ?Quartile  dct:title ?titleQuartile ;\r\n" + 
                		"               myData:quartile ?ValueQuartile.\r\n" + 
                		"}";
    }
	
	
	public static List<HashMap<String, String>> queryAutores (RepositoryConnection repositoryConnection) {
	//public static List<HashMap<String, String>> queryAutores (RepositoryConnection repositoryConnection) {
        TupleQuery tupleQuery = repositoryConnection
                .prepareTupleQuery(QueryLanguage.SPARQL, query_autores);
        TupleQueryResult result = null;
        
        List<HashMap<String, String>> respuesta = new ArrayList<>();
        List<HashMap<String, String>> autores = new ArrayList<>();
        
        List<String> autoresArray = new ArrayList<>();
        
        
        List<HashMap<String, List<String>>> autoresHash = new ArrayList<>();
        
        //HashMap<String, List<String>> docList = new HashMap<>();
        
        int contJ = 0;
        String id_Actual= "";
        
        HashMap<String, String> doc = new HashMap<String, String>();
        
        try {
            result = tupleQuery.evaluate();
            boolean bandera= true;
            int num_autor=0;
            while (result.hasNext()) {
                BindingSet bindingSet = result.next();

                SimpleIRI recurso = (SimpleIRI) bindingSet.getValue("recurso");
                SimpleLiteral titulo = (SimpleLiteral) bindingSet.getValue("titulo");
                SimpleLiteral autor = (SimpleLiteral) bindingSet.getValue("autor");
                
                //HashMap<String, String> doc = new HashMap<String, String>();
                HashMap<String, List<String>> docList = new HashMap<>();
                HashMap<String, String> limpio = new HashMap<String, String>();
                String[] parts_recurso = recurso.stringValue().split("/");
                String recursoValue = parts_recurso[parts_recurso.length-1];
                
                if(bandera) {
                	num_autor= 0;
                	
                    doc.put("recurso", recursoValue);
                    doc.put("titulo", titulo.stringValue());
                    doc.put(("autor"+num_autor), autor.stringValue());
                    bandera= false;
                }
                if(contJ==0) {
                	id_Actual = recursoValue;
                }
                
                if(contJ>0) {
                	 if(id_Actual.equals(recursoValue)) {
                		 System.out.println("jeje");
                		 num_autor= num_autor+1;
                		 doc.put(("autor"+num_autor), autor.stringValue());
                     }else {
                    	 id_Actual= recursoValue;
                    	 bandera=true;
                    	 respuesta.add(doc);
                    	 doc=limpio;
                     }
                }
                contJ=contJ+1;
            }
            
            
        } catch (QueryEvaluationException qee) {
            logger.error(WTF_MARKER,
                    qee.getStackTrace().toString(), qee);
        } finally {
            result.close();
        }
        return respuesta;
    }
	
	
	public static List<HashMap<String, String>> queryLenguajes (RepositoryConnection repositoryConnection) {
        TupleQuery tupleQuery = repositoryConnection
                .prepareTupleQuery(QueryLanguage.SPARQL, query_lenguajes);
        TupleQueryResult result = null;
        
        List<HashMap<String, String>> respuesta = new ArrayList<>();
        try {
            result = tupleQuery.evaluate();
            while (result.hasNext()) {
                BindingSet bindingSet = result.next();

                SimpleIRI lenguaje = (SimpleIRI) bindingSet.getValue("lenguaje");
                SimpleLiteral cantidad = (SimpleLiteral) bindingSet.getValue("cantidad");
                
                HashMap<String, String> doc = new HashMap<String, String>();
                
                String[] parts_lenguage = lenguaje.stringValue().split("/");
                doc.put("lenguaje", parts_lenguage[parts_lenguage.length-1]);
                
                doc.put("cantidad", cantidad.stringValue());
                
                respuesta.add(doc);
                 
            }
        } catch (QueryEvaluationException qee) {
            logger.error(WTF_MARKER,
                    qee.getStackTrace().toString(), qee);
        } finally {
            result.close();
        }
        return respuesta;
    }
	
	
	public static List<HashMap<String, String>> queryRecursos (RepositoryConnection repositoryConnection) {
        TupleQuery tupleQuery = repositoryConnection
                .prepareTupleQuery(QueryLanguage.SPARQL, query_scholary_works);
        TupleQueryResult result = null;
        
        List<HashMap<String, String>> respuesta = new ArrayList<>();
        try {
            result = tupleQuery.evaluate();
            while (result.hasNext()) {
                BindingSet bindingSet = result.next();
                
                SimpleIRI recurso = (SimpleIRI) bindingSet.getValue("recurso");
                SimpleLiteral titulo = (SimpleLiteral) bindingSet.getValue("titulo");
                SimpleLiteral date = (SimpleLiteral) bindingSet.getValue("date");
                SimpleIRI lenguaje = (SimpleIRI) bindingSet.getValue("lenguaje");
                SimpleIRI tipo = (SimpleIRI) bindingSet.getValue("tipo");
                SimpleLiteral numCitas = (SimpleLiteral) bindingSet.getValue("numCitas");
                

                HashMap<String, String> doc = new HashMap<String, String>();
                
                String[] parts_recurso = recurso.stringValue().split("/");
                doc.put("recurso", parts_recurso[parts_recurso.length-1]);
                
                doc.put("titulo", titulo.stringValue());
                
                doc.put("date", date.stringValue());
                
                String[] parts_lenguage = lenguaje.stringValue().split("/");
                doc.put("lenguaje", parts_lenguage[parts_lenguage.length-1]);
                
                String[] parts_tipo = tipo.stringValue().split("/");
                doc.put("tipo", parts_tipo[parts_tipo.length-1]);
                
                doc.put("numCitas", numCitas.stringValue());
                
                respuesta.add(doc);
                 
            }
        } catch (QueryEvaluationException qee) {
            logger.error(WTF_MARKER,
                    qee.getStackTrace().toString(), qee);
        } finally {
            result.close();
        }
        return respuesta;
    }
	
	public static List<HashMap<String, String>> queryPrincipal (RepositoryConnection repositoryConnection) {
        TupleQuery tupleQuery = repositoryConnection
                .prepareTupleQuery(QueryLanguage.SPARQL, strQuery_Principal);
        TupleQueryResult result = null;
        
        List<HashMap<String, String>> respuesta = new ArrayList<>();
        try {
            result = tupleQuery.evaluate();
            while (result.hasNext()) {
                BindingSet bindingSet = result.next();
                SimpleLiteral titulo = (SimpleLiteral) bindingSet.getValue("titulo");
                SimpleIRI Recursos = (SimpleIRI) bindingSet.getValue("Recursos");
                SimpleIRI tipo = (SimpleIRI) bindingSet.getValue("tipo");
                

                HashMap<String, String> doc = new HashMap<String, String>();
                doc.put("recurso", Recursos.stringValue());
                doc.put("titulo", titulo.stringValue());
                doc.put("tipo", tipo.stringValue());
                respuesta.add(doc);
                 
            }
        } catch (QueryEvaluationException qee) {
            logger.error(WTF_MARKER,
                    qee.getStackTrace().toString(), qee);
        } finally {
            result.close();
        }
        return respuesta;
    }

	public static List<HashMap<String, String>> query1 (RepositoryConnection repositoryConnection) {
        TupleQuery tupleQuery = repositoryConnection
                .prepareTupleQuery(QueryLanguage.SPARQL, strQuery1);
        TupleQueryResult result = null;
        
        List<HashMap<String, String>> respuesta = new ArrayList<>();
        try {
            result = tupleQuery.evaluate();
            while (result.hasNext()) {
                BindingSet bindingSet = result.next();
                SimpleLiteral titulo = (SimpleLiteral) bindingSet.getValue("titulo");
                SimpleIRI Recursos = (SimpleIRI) bindingSet.getValue("Recursos");
                  
                HashMap<String, String> doc = new HashMap<String, String>();
                doc.put("recurso", Recursos.stringValue());
                doc.put("titulo", titulo.stringValue());
                respuesta.add(doc);
                 
            }
        } catch (QueryEvaluationException qee) {
            logger.error(WTF_MARKER,
                    qee.getStackTrace().toString(), qee);
        } finally {
            result.close();
        }
        return respuesta;
    }
	
	public static List<HashMap<String, String>> query2 (RepositoryConnection repositoryConnection) {
        TupleQuery tupleQuery = repositoryConnection
                .prepareTupleQuery(QueryLanguage.SPARQL, strQuery2);
        TupleQueryResult result = null;
        
        List<HashMap<String, String>> respuesta = new ArrayList<>();
        try {
            result = tupleQuery.evaluate();
            while (result.hasNext()) {
                BindingSet bindingSet = result.next();
                SimpleLiteral cantidad = (SimpleLiteral) bindingSet.getValue("cantidad");
                SimpleIRI tipo = (SimpleIRI) bindingSet.getValue("tipo");
                  
                HashMap<String, String> doc = new HashMap<String, String>();
                
                
                String[] parts_urltipo = tipo.stringValue().split("/");
                doc.put("tipo", parts_urltipo[parts_urltipo.length-1]);
                doc.put("cantidad", cantidad.stringValue());
                respuesta.add(doc);
                 
            }
        } catch (QueryEvaluationException qee) {
            logger.error(WTF_MARKER,
                    qee.getStackTrace().toString(), qee);
        } finally {
            result.close();
        }
        return respuesta;
    }

    public static List<HashMap<String, String>> query3 (RepositoryConnection repositoryConnection) {
        TupleQuery tupleQuery = repositoryConnection
                .prepareTupleQuery(QueryLanguage.SPARQL, strQuery3);
        TupleQueryResult result = null;

        List<HashMap<String, String>> respuesta = new ArrayList<>();
        try {
            result = tupleQuery.evaluate();
            while (result.hasNext()) {
                BindingSet bindingSet = result.next();
                SimpleLiteral titulo = (SimpleLiteral) bindingSet.getValue("titulo");
                SimpleIRI Recursos = (SimpleIRI) bindingSet.getValue("Recursos");
                SimpleIRI tipo = (SimpleIRI) bindingSet.getValue("tipo");
                SimpleIRI language = (SimpleIRI) bindingSet.getValue("language");
                SimpleIRI creador = (SimpleIRI) bindingSet.getValue("creador");
                SimpleLiteral nameCreador = (SimpleLiteral) bindingSet.getValue("nameCreador");



                HashMap<String, String> doc = new HashMap<String, String>();
                doc.put("recurso", Recursos.stringValue());
                doc.put("titulo", titulo.stringValue());
                doc.put("tipo", tipo.stringValue());
                doc.put("language", language.stringValue());
                doc.put("creador", creador.stringValue());
                doc.put("nameCreador", nameCreador.stringValue());

                respuesta.add(doc);



            }
        } catch (QueryEvaluationException qee) {
            logger.error(WTF_MARKER,
                    qee.getStackTrace().toString(), qee);
        } finally {
            result.close();
        }
        return respuesta;
    }

    public static List<HashMap<String, String>> query4 (RepositoryConnection repositoryConnection) {
        TupleQuery tupleQuery = repositoryConnection
                .prepareTupleQuery(QueryLanguage.SPARQL, strQuery4);
        TupleQueryResult result = null;

        List<HashMap<String, String>> respuesta = new ArrayList<>();
        try {
            result = tupleQuery.evaluate();
            while (result.hasNext()) {
                BindingSet bindingSet = result.next();
                SimpleIRI Recursos = (SimpleIRI) bindingSet.getValue("Recurso");
                SimpleLiteral tituloRecurso = (SimpleLiteral) bindingSet.getValue("tituloRecurso");
                SimpleLiteral titulo = (SimpleLiteral) bindingSet.getValue("titulo");
                SimpleIRI country = (SimpleIRI) bindingSet.getValue("country");
                SimpleLiteral titleQuartile = (SimpleLiteral) bindingSet.getValue("titleQuartile");
                SimpleLiteral ValueRank = (SimpleLiteral) bindingSet.getValue("ValueRank");
                SimpleLiteral ValueQuartile = (SimpleLiteral) bindingSet.getValue("ValueQuartile");

                HashMap<String, String> doc = new HashMap<String, String>();
                String[] parts_recurso = Recursos.stringValue().split("/");
                doc.put("idRecursos", parts_recurso[parts_recurso.length-1]);
                doc.put("tituloRecurso", tituloRecurso.stringValue());
                doc.put("titulo", titulo.stringValue());
                doc.put("country", country.stringValue());
                doc.put("titleQuartile", titleQuartile.stringValue());
                doc.put("ValueRank", ValueRank.stringValue());
                doc.put("ValueQuartile", ValueQuartile.stringValue());

                respuesta.add(doc);

            }
        } catch (QueryEvaluationException qee) {
            logger.error(WTF_MARKER,
                    qee.getStackTrace().toString(), qee);
        } finally {
            result.close();
        }
        return respuesta;
    }
}
