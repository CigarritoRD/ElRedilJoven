import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Cross, Mail, Lock, AlertCircle } from 'lucide-react';
import { loginSchema } from '../../schemas';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import { SITE_NAME } from '../../lib/constants';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, isAdmin, loading } = useAuth();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-container border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (data) => {
    setError('');
    try {
      await signIn(data.email, data.password);
      toast.success('Sesión iniciada correctamente');
      navigate('/admin');
    } catch (err) {
      setError('Credenciales inválidas. Por favor intenta de nuevo.');
      toast.error('Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-container/10" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-tertiary/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
          <div className="text-center mb-8">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white overflow-hidden shadow-xl shadow-primary/20 ring-1 ring-white/20 mb-4">
              <img src="/logo-lamb.png" alt={SITE_NAME} className="w-full h-full object-contain scale-[1.65] origin-center" />
            </div>
            <h1 className="text-3xl font-display font-bold text-white">{SITE_NAME}</h1>
          <p className="text-on-surface-variant mt-2">Portal de Administración</p>
        </div>

        <Card glass className="p-8">
          <h2 className="text-xl font-display font-bold text-white mb-6 text-center">
            Iniciar Sesión
          </h2>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error/10 border border-error/20 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-error flex-shrink-0" />
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant" />
              <Input
                type="email"
                placeholder="Email"
                className="pl-10"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant" />
              <Input
                type="password"
                placeholder="Contraseña"
                className="pl-10"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-on-surface-variant">
            ¿Olvidaste tu contraseña? Contacta al administrador.
          </p>
        </Card>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-primary hover:underline">
            ← Volver al sitio público
          </a>
        </div>
      </motion.div>
    </div>
  );
}
