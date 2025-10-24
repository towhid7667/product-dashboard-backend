import { Request, Response } from 'express';
import { db } from '../config/firebase';
import { Product } from '../types';

const productsCollection = db.collection('products');

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const snapshot = await productsCollection.get();
    const products: Product[] = [];

    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: (error as Error).message });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData: Omit<Product, 'id'> = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await productsCollection.add(productData);
    const newProduct = { id: docRef.id, ...productData };

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date(),
    };

    await productsCollection.doc(id).update(updateData);
    const updatedDoc = await productsCollection.doc(id).get();

    res.json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await productsCollection.doc(id).delete();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};