import bcrypt from 'bcrypt';
import crypto  from 'crypto';

export class Criptografia{


    public async criptografar(hash : string): Promise<string> {
    
       try {
        
        
        const hashe = await bcrypt.hash(hash , 10);
        
        return hashe;
       } catch (error) {
        console.error(error)
        throw error;
       }
    }


    public descriptografar(senha : string, hash : string): boolean{

        try {
            const hashes = bcrypt.compareSync(senha,hash);
            console.log(hashes)
            return hashes;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
    
  
}