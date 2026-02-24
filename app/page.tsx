import { redirect } from 'next/navigation';

export default function Home() {
  // Automatically teleport users to the Command Center
  redirect('/dashboard');
}