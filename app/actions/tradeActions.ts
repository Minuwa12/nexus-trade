'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addTrade(formData: FormData) {
  // 1. Extract the data from your form
  const ticker = formData.get('ticker') as string;
  const side = formData.get('side') as string;
  const entryPrice = parseFloat(formData.get('entryPrice') as string);
  const exitPrice = formData.get('exitPrice') ? parseFloat(formData.get('exitPrice') as string) : null;
  const netPnl = formData.get('netPnl') ? parseFloat(formData.get('netPnl') as string) : null;

  // 2. Inject it into the Supabase Vault
  await prisma.trade.create({
    data: {
      ticker,
      side,
      entryPrice,
      exitPrice,
      netPnl,
    },
  });

  // 3. Tell the app to refresh the vault and send you back to the log
  revalidatePath('/dashboard/trades');
  redirect('/dashboard/trades');
}export async function deleteTrade(formData: FormData) {
  const id = formData.get('id') as string;

  await prisma.trade.delete({
    where: { id },
  });

  revalidatePath('/dashboard/trades');
}