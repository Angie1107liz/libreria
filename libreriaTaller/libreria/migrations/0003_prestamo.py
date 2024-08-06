# Generated by Django 3.2.14 on 2024-07-31 20:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('libreria', '0002_usuario_alter_libro_genero'),
    ]

    operations = [
        migrations.CreateModel(
            name='prestamo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_prestamo', models.DateField()),
                ('fecha_devolucion', models.DateField()),
                ('Estado', models.IntegerField(choices=[(1, 'Prestamo'), (2, 'Entregado'), (3, 'Cancelado')])),
                ('libro_prestamo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='prestamo', to='libreria.libro')),
                ('usuario_prestamo', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='prestamo', to='libreria.usuario')),
            ],
        ),
    ]