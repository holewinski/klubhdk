<template>
  <div>
    <h1 class="page-title">Informacja o chorobach zakaźnych dla krwiodawców</h1>
    <b>O czym musisz wiedzieć przed oddaniem krwi:</b>
    <br />
    Twoja krew zostanie zbadana, aby stwierdzić, czy nie jesteś zakażony/a kiłą,
    AIDS, żółtaczką zakaźną B lub C. Jeśli test wypadnie dodatnio, nie zostanie
    przetoczona. Jednak przy każdej infekcji pomiędzy momentem zakażenia i
    chwilą, gdy staje się możliwe wykrycie go drogą badań laboratoryjnych,
    upływa pewien czas. W tym okresie w żadnym wypadku nie wolno oddawać krwi,
    ponieważ może być źródłem zakażenia, chociaż testy laboratoryjne są jeszcze
    ujemne. Nie oddawaj więc krwi, jeżeli przez ryzykowne kontakty lub
    zachowania naraziłeś/aś się na niebezpieczeństwo.
    <br />
    <b>Ryzyko stwarzają:</b>
    <ul>
      <li>Wcześniej lub aktualnie stosowane narkotyki w postaci zastrzyków.</li>
      <li>
        Kontakty seksualne z osobami stosującymi narkotyki w postaci zastrzyków.
      </li>
      <li>Kontakty seksualne z wieloma partnerkami/partnerami.</li>
      <li>
        Kontakty seksualne z partnerem/partnerką, których znasz od niedawna.
      </li>
      <li>Kontakty seksualne w celu zarobkowym.</li>
      <li>
        Kontakty seksualne z osobami, u których testy w kierunku AIDS, kiły lub
        żółtaczki zakaźnej B lub C wypadły dodatnio.
      </li>
    </ul>
    <br />
    Zdajemy sobie sprawę, że zadając te pytania wkraczamy w Twoją sferę
    prywatną. Jednak niewielkie ryzyko przeniesienia zakażenia drogą krwi można
    dalej zmniejszyć jedynie wtedy, gdy będąc dawcą dokładnie przemyślisz
    opisane tu sytuacje i skrupulatnie odpowiesz na postawione pytania. Twoje
    dane będą traktowane poufnie. Przy pozytywnych wynikach badań (wskazujących
    na infekcję) zostaniesz o tym poinformowany/a przez lekarza.
  </div>
</template>
<script>
export default {
  name: "Choroby",
  data() {
    return {};
  },
  computed: {
    rout() {
      return this.$router;
    }
  }
};
</script>
