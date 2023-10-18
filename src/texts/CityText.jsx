

function CityText({selectedCity, selectedCounty, cityOptions, countyOptions}) {
    const city = cityOptions?.find(
        (option) => option.value === selectedCity
    )

    const county = countyOptions?.find(
        (option) => option.value === selectedCounty
    ) 

    if(!city.label) return <></>

    return (
        <div className="p-4">
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3435885379042213"
                 crossorigin="anonymous"></script>
            <ins class="adsbygoogle"
                 style="display:block; text-align:center;"
                 data-ad-layout="in-article"
                 data-ad-format="fluid"
                 data-ad-client="ca-pub-3435885379042213"
                 data-ad-slot="1019306344"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
            <h2 className="font-bold text-2xl mb-3">{city?.label} {county?.label} Nöbetçi Eczane Nerede?</h2>
            <p className="mb-5">{city?.label} {county?.label} ilçesindeki nöbetçi eczanelerin konumlarına ve iletişim bilgilerine ulaşmak için çevrimiçi sorgulama hizmeti kullanabilirsiniz. Nöbetçi eczanelerin güncel listesine ulaşarak ihtiyacınız olan ilaçları temin edebilirsiniz.</p>

            <h2 className="font-bold text-2xl mb-3">{city?.label} {county?.label} Nöbetçi Eczane Sorgulama</h2>
            <p className="mb-5">{city?.label} {county?.label}'de nöbetçi eczaneleri sorgulamak için internet üzerinden kolayca araştırma yapabilirsiniz. İlaç ihtiyacınız olduğunda veya sorularınızı sormak istediğinizde bu hizmetten faydalanabilirsiniz.</p>

            <h2 className="font-bold text-2xl mb-3">{city?.label} {county?.label} En Yakın Nöbetçi Eczane Nerede?</h2>
            <p className="mb-5">{city?.label} {county?.label} ilçesinde en yakın nöbetçi eczane hakkında bilgi almak istiyorsanız, web sitemiz size yardımcı olacaktır. En güncel nöbetçi eczane listesini kontrol ederek sağlık ihtiyaçlarınızı karşılayabilirsiniz.</p>

            <h2 className="font-bold text-2xl mb-3">{city?.label} {county?.label} Nöbetçi Eczane Mesai Saatleri</h2>
            <p className="mb-5">{city?.label} {county?.label} nöbetçi eczanelerinin çalışma saatleri haftanın her günü 24 saat boyunca hizmet verir. Öğle saatlerinde de açıktır ve kesintisiz olarak ilaç temin etmenize imkan tanır.</p>

            <h2 className="font-bold text-2xl mb-3">Eczaneler Bayramda Kapalı Mı?</h2>
            <p className="mb-5">Eczaneler dini ve resmi bayramlarda genellikle kapalıdır. Özellikle Kurban Bayramı, Ramazan Bayramı ve bazı resmi tatillerde eczaneler kapalı olabilir. Ancak nöbetçi eczaneler, bayram günlerinde de hizmet vermeye devam ederler.</p>

            <h2 className="font-bold text-2xl mb-3">Eczane Çalışma Saatleri</h2>
            <p className="mb-5">Eczanelerin normal çalışma saatleri hafta içi ve cumartesi günleri sabah 09:00'da başlar ve akşam 19:00'da sona erer. Ancak nöbetçi eczaneler haftanın her günü 24 saat açıktır, bu nedenle ilaç ihtiyaçlarınızı her zaman karşılayabilirsiniz.</p>
            
            <h2 className="font-bold text-2xl mb-3">{city?.label} Nöbetçi Eczanesi Hangi İlçelerde Var?</h2>
            <ul>
                {countyOptions?.map((c,i) => <li key={i}><strong>{c?.label}</strong> nöbetçi eczaneleri</li>)}
            </ul>

              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3435885379042213"
                 crossorigin="anonymous"></script>
                <ins class="adsbygoogle"
                     style="display:block; text-align:center;"
                     data-ad-layout="in-article"
                     data-ad-format="fluid"
                     data-ad-client="ca-pub-3435885379042213"
                     data-ad-slot="1019306344"></ins>
                <script>
                     (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
        </div>

    )
  }
  
  export default CityText;
  
