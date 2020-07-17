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
	
	private static String strQuery_Principal;
	private static String strQuery1;
	


	public static RepositoryConnection getRepositoryConnection() {
		Repository repository = new HTTPRepository(GRAPHDB_SERVER, REPOSITORY_ID);
		repository.initialize();
		RepositoryConnection repositoryConnection = repository.getConnection();
		return repositoryConnection;
	}
	
	static {
		
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
	
	

}
