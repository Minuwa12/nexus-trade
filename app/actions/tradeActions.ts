'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

// --- THE DELETE FUNCTION ---
export async function deleteTrade(formData: FormData) {
  const { userId } = await auth(); // 👈 Get current user
  const id = formData.get('id') as string;

  if (!userId) throw new Error("Unauthorized");

  // Only delete if the ID matches AND it belongs to this user
  await prisma.trade.delete({ 
    where: { 
      id: id,
      userId: userId // 👈 THE EXTRA LOCK
    } 
  });

  revalidatePath('/dashboard');
}

// --- THE CREATE FUNCTION (Fixed for Vercel) ---
export async function createTrade(formData: FormData) {
  // 1. Get the Bouncer's ID
  const { userId } = await auth(); 
  
  if (!userId) {
    throw new Error("You must be logged in to inject trades.");
  }

  const ticker = formData.get('ticker') as string;
  const side = formData.get('side') as string;
  const entryPrice = parseFloat(formData.get('entryPrice') as string);
  
  const rawExit = formData.get('exitPrice');
  const rawPnl = formData.get('netPnl');
  const exitPrice = rawExit ? parseFloat(rawExit as string) : null;
  const netPnl = rawPnl ? parseFloat(rawPnl as string) : null;

  // 2. Inject it into the Supabase Vault
  await prisma.trade.create({
    data: {
      userId,  // 👈 THIS IS WHAT VERCEL WAS LOOKING FOR
      ticker,
      side,
      entryPrice,
      exitPrice,
      netPnl,
    }
  });
  
  revalidatePath('/dashboard');
}