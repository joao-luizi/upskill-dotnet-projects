using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Personagem
{
    public class Jogo
    {
        public abstract class Item
        {
            public string Nome { get; private set; }

          
            public Item(string _nome)
            {
                Nome = _nome;
            }
            public abstract void Usar(Entidade alvo);
        }
        public class Pocao : Item
        {
            public int Cura { get; set; }
           

            public Pocao(string nome, int cura) : base(nome)
            {
                Cura = cura;
               
            }

            public override void Usar(Entidade alvo)
            {
                if (alvo is Personagem personagem)
                    personagem.Vida += this.Cura;
                Console.WriteLine($"{alvo.Nome} recuperou {Cura} de vida!");
            }
        }

        public class Arma : Item
        {
            public int Dano { get; private set; }

           
            public Arma(string nome, int dano) : base(nome)
            {
               Dano = dano;
            }
            public override void Usar(Entidade alvo)
            {
                if (alvo is Personagem personagem)
                    personagem.Ataque += this.Dano;
                Console.WriteLine($"{alvo.Nome} equipa {this.Nome}");
            }
        }

        public class Inventario
        {
            private List<Item> items = new();

            public void Adicionar(Item item)
            {
                items.Add(item);
                Console.WriteLine($"{item.Nome} foi adicionado ao inventário.");
            }

            public void Remover(Item item)
            {
                items.Remove(item);
                Console.WriteLine($"{item.Nome} foi removido ao inventário.");
            }

            public T? ObterPrimeiroItem<T>() where T : Item
            {
                for (int i = 0; i < items.Count;i++)
                {
                    if (items[i] is T t)
                        return t;
                }
                return default;
            }

            
        }

        public class Entidade
        {
            public string Nome { get; set; }
            public int Vida { get; set; }

            public Entidade(string nome, int vida)
            {
                Nome = nome;
                Vida = vida;
            }

            public bool EstaVivo() => Vida > 0;
        }

        public class Personagem : Entidade
        {
            public int Ataque { get; set; }

            public Inventario Inventario { get; } = new();

            public Personagem(string nome, int vida, int ataque)
                : base(nome, vida)
            {
                Ataque = ataque;
            }

            public void Atacar(Entidade alvo)
            {
                alvo.Vida -= Ataque;
                Console.WriteLine($"{Nome} causou {Ataque} de dano em {alvo.Nome}");
            }

            // ⭐ Agora o comportamento está na classe certa
            public void UsarPocao()
            {
                var item = Inventario.ObterPrimeiroItem<Pocao>();

                if (item == null)
                {
                    Console.WriteLine($"{Nome} não tem poções!");
                    return;
                }

                item.Usar(this);
                //this.Vida += item.Cura; O item deve saber como afeta a personagem
                Inventario.Remover(item);
            }

            public void EquiparArma()
            {
                var item = Inventario.ObterPrimeiroItem<Arma>();

                if (item == null)
                    return;

                item.Usar(this);
                //this.Ataque += item.Dano; O item deve saber como afeta a personagem
            }
        }

        public class Teste
        {
            public static void Lutar(Personagem p1, Personagem p2)
            {
                Console.WriteLine("\nBATALHA INICIADA!\n");

                while (p1.EstaVivo() && p2.EstaVivo())
                {
                    if (p1.Vida < 40)
                        p1.UsarPocao();

                    p1.Atacar(p2);

                    if (!p2.EstaVivo())
                        break;

                    if (p2.Vida < 40)
                        p2.UsarPocao();

                    p2.Atacar(p1);

                    Console.WriteLine($"\nVida {p1.Nome}: {p1.Vida}");
                    Console.WriteLine($"Vida {p2.Nome}: {p2.Vida}");
                    Console.WriteLine("-----------------\n");
                }

                Console.WriteLine(p1.EstaVivo()
                    ? $"{p1.Nome} venceu!"
                    : $"{p2.Nome} venceu!");
            }

            public static void Combate()
            {
                const string nomeHeroi = "Arthur";
                const string nomeInimigo = "Orc";

                var heroi = new Personagem(nomeHeroi, 100, 20);
                var inimigo = new Personagem(nomeInimigo, 90, 15);

                heroi.Inventario.Adicionar(new Arma("Espada Longa", 10));
                heroi.Inventario.Adicionar(new Pocao("Poção Grande", 30));

                inimigo.Inventario.Adicionar(new Pocao("Poção Rústica", 20));

                // Equipar antes da luta
                heroi.EquiparArma();

                Console.WriteLine($"\nAtaque de {nomeHeroi} após equipar: {heroi.Ataque}\n");

                Lutar(heroi, inimigo);
            }
        }
    }
}
