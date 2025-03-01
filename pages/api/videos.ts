import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../src/mongodb'; 

export default async (_req: NextApiRequest, res: NextApiResponse) => { 
  if (_req.method === 'GET') {


       const ProductsCollection = await client.db("Power").collection("Products")
      //  const docs = await ProductsCollection.distinct('videoUrl')
       const docs = await ProductsCollection.find({'videoUrl':{$exists: true,$ne: ""}}).limit(30)
      
      const products : any[] = [];
       await docs.forEach((prod:any) =>{ 
              products.push(prod);
        })
        if (products.length > 0) { 
            return res.status(200).json(products);
          }
}
return res.status(404).json({success:false}); 
}
