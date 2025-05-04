<?php

namespace App\Http\Controllers;

use App\Facades\ApiFacade;
use Illuminate\Http\Request;

class CreateController extends Controller
{
    public function __invoke()
    {
        try {
            // Faz a requisição à API
            $response = ApiFacade::get('jobs');
            
            // Verifica se a resposta foi bem-sucedida
            if ($response->successful()) {
                $data = $response->json();
                $allJobsData = isset($data['jobs']) && is_array($data['jobs']) ? $data['jobs'] : [];
                $error = null;
            } else {
                // Se a requisição falhar, define um erro
                $allJobsData = [];
                $error = 'Erro ao obter dados de vagas. Tente novamente mais tarde.';
            }
        } catch (\Exception $e) {
            // Se houver um erro ao tentar fazer a requisição, define um erro genérico
            $allJobsData = [];
            $error = 'Erro de rede. Não foi possível conectar à API.';
        }
    
        // Retorna a view com os dados e a mensagem de erro (se houver)
        return view('welcome', ['data' => $allJobsData, 'error' => $error]);
    }
    
    public function search(Request $request)
    {
        $searchTerm = $request->input('term');
        $response = ApiFacade::get('jobs', [
            'query' => ['search' => $searchTerm]
        ]);
        $data = $response->json();
        $allJobsData = isset($data['jobs']) && is_array($data['jobs']) ? $data['jobs'] : [];
        return response()->json(['jobs' => $allJobsData]);
    }

     // Processa o POST de login
     public function login(Request $request)
     {
         // Validação
         $request->validate([
             'email'    => 'required|email',
             'password' => 'required|min:6',
         ]);
 
         // Prepara o payload JSON
         $payload = [
             'email'    => $request->input('email'),
             'password' => $request->input('password'),
         ];
 
         // Chama a API de login enviando JSON puro
         $response = ApiFacade::withHeaders([
                 'Accept'       => 'application/json',
                 'Content-Type' => 'application/json',
             ])
             ->withBody(json_encode($payload), 'application/json')
             ->post('login');
 
         // Debug rápido (remova em produção!)
         // dd($response->status(), $response->body(), $response->json());
 
         if (! $response->successful()) {
            return back()
                ->withInput()
                ->withErrors([
                    'login' => "{$response->body()}"
                ]);
        }
        
        // Simula sucesso de login e SMS verificado
        session(['authenticated' => true]);
        
        return redirect()->route('admin');
        
     }
    

     public function admin()
     {
         if (! session()->has('authenticated')) {
             return redirect()->route('login');
         }
     
         return view('admin');
     }
     

}
