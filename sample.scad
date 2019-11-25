
height = 15;
handleWidth = 3.8;
handleThickness = 2.5;
width = 1.8;

module thicknessoffset(points, thickness, bidirectional = false) {
    

    if (bidirectional) {
        difference() {
         offset(r = thickness) {
          polygon(points);
         }
         offset(r = -thickness) {
          polygon(points);
         }
       }
   }
   else {
        difference() {
         offset(r = thickness) {
          polygon(points);
         }
         polygon(points);
       }  
   }

}

cookieOutline=[[414.200,437.000],[414.200,436.000],[414.200,435.000],[414.200,434.000],[414.200,433.000],[414.000,432.800],[413.200,432.000],[413.000,431.800],[412.200,431.000],[412.000,430.800],[411.200,430.000],[411.200,429.000],[411.000,428.800],[410.200,428.000],[410.000,427.800],[409.200,427.000],[409.000,426.800],[408.200,426.000],[408.000,425.800],[407.200,425.000],[407.200,424.000],[407.000,423.800],[406.200,423.000],[406.000,422.800],[405.200,422.000],[405.000,421.800],[404.200,421.000],[404.000,420.800],[403.200,420.000],[403.000,419.800],[402.200,419.000],[402.200,418.000],[402.000,417.800],[401.200,417.000],[401.000,416.800],[400.200,416.000],[400.000,415.800],[399.200,415.000],[399.000,414.800],[398.200,414.000],[398.000,413.800],[397.200,413.000],[397.200,412.000],[397.000,411.800],[396.200,411.000],[396.000,410.800],[395.200,410.000],[395.000,409.800],[394.200,409.000],[394.000,408.800],[393.200,408.000],[393.200,407.000],[393.000,406.800],[392.200,406.000],[392.000,405.800],[391.200,405.000],[391.000,404.800],[390.200,404.000],[390.000,403.800],[389.200,403.000],[389.000,402.800],[388.200,402.000],[388.200,401.000],[388.000,400.800],[387.200,400.000],[387.000,399.800],[386.200,399.000],[386.000,398.800],[385.200,398.000],[385.000,397.800],[384.200,397.000],[384.200,396.000],[384.000,395.800],[383.200,395.000],[383.000,394.800],[382.200,394.000],[382.000,393.800],[381.200,393.000],[381.000,392.800],[380.200,392.000],[380.000,391.800],[379.200,391.000],[379.200,390.000],[379.000,389.800],[378.200,389.000],[378.000,388.800],[377.200,388.000],[377.000,387.800],[376.200,387.000],[376.000,386.800],[375.200,386.000],[375.200,385.000],[375.000,384.800],[374.200,384.000],[374.000,383.800],[373.200,383.000],[373.000,382.800],[372.200,382.000],[372.000,381.800],[371.200,381.000],[371.000,380.800],[370.200,380.000],[370.200,379.000],[370.000,378.800],[369.200,378.000],[369.000,377.800],[368.200,377.000],[368.000,376.800],[367.200,376.000],[367.000,375.800],[366.200,375.000],[366.200,374.000],[366.000,373.800],[365.200,373.000],[365.000,372.800],[364.200,372.000],[364.000,371.800],[363.200,371.000],[363.000,370.800],[362.200,370.000],[362.000,369.800],[361.200,369.000],[361.200,368.000],[361.000,367.800],[360.200,367.000],[360.000,366.800],[359.200,366.000],[359.000,365.800],[358.200,365.000],[358.000,364.800],[357.200,364.000],[357.000,363.800],[356.200,363.000],[356.200,362.000],[356.000,361.800],[355.200,361.000],[355.000,360.800],[354.200,360.000],[354.000,359.800],[353.200,359.000],[353.000,358.800],[352.200,358.000],[352.200,357.000],[352.000,356.800],[351.200,356.000],[351.000,355.800],[350.200,355.000],[350.000,354.800],[349.200,354.000],[349.000,353.800],[348.200,353.000],[348.000,352.800],[347.200,352.000],[347.200,351.000],[347.000,350.800],[346.200,350.000],[346.000,349.800],[345.200,349.000],[345.000,348.800],[344.200,348.000],[344.000,347.800],[343.200,347.000],[343.200,346.000],[343.000,345.800],[342.200,345.000],[342.000,344.800],[341.200,344.000],[341.000,343.800],[340.200,343.000],[340.000,342.800],[339.200,342.000],[339.000,341.800],[338.200,341.000],[338.200,340.000],[338.000,339.800],[337.200,339.000],[337.000,338.800],[336.200,338.000],[336.000,337.800],[335.200,337.000],[335.000,336.800],[334.200,336.000],[334.200,335.000],[334.000,334.800],[333.200,334.000],[333.000,333.800],[332.200,333.000],[332.000,332.800],[331.200,332.000],[331.000,331.800],[330.200,331.000],[330.000,330.800],[329.200,330.000],[329.200,329.000],[329.000,328.800],[328.200,328.000],[328.000,327.800],[327.200,327.000],[327.000,326.800],[326.200,326.000],[326.000,325.800],[325.200,325.000],[325.200,324.000],[325.000,323.800],[324.200,323.000],[324.000,322.800],[323.200,322.000],[323.000,321.800],[322.200,321.000],[322.000,320.800],[321.200,320.000],[321.000,319.800],[320.200,319.000],[320.200,318.000],[320.000,317.800],[319.200,317.000],[319.000,316.800],[318.200,316.000],[318.000,315.800],[317.200,315.000],[317.000,314.800],[316.200,314.000],[316.000,313.800],[315.200,313.000],[315.200,312.000],[315.000,311.800],[314.200,311.000],[314.000,310.800],[313.200,310.000],[313.000,309.800],[312.200,309.000],[312.000,308.800],[311.200,308.000],[311.200,307.000],[311.000,306.800],[310.200,306.000],[310.000,305.800],[309.200,305.000],[309.000,304.800],[308.200,304.000],[308.000,303.800],[307.200,303.000],[307.000,302.800],[306.200,302.000],[306.200,301.000],[306.000,300.800],[305.200,300.000],[305.000,299.800],[304.200,299.000],[304.000,298.800],[303.200,298.000],[303.000,297.800],[302.200,297.000],[302.200,296.000],[302.000,295.800],[301.200,295.000],[301.000,294.800],[300.200,294.000],[300.000,293.800],[299.200,293.000],[299.000,292.800],[298.200,292.000],[298.000,291.800],[297.200,291.000],[297.200,290.000],[297.000,289.800],[296.200,289.000],[296.000,288.800],[295.200,288.000],[295.000,287.800],[294.200,287.000],[294.000,286.800],[293.200,286.000],[293.200,285.000],[293.000,284.800],[292.200,284.000],[292.000,283.800],[291.200,283.000],[291.200,282.000],[291.000,281.800],[290.200,281.000],[290.200,280.000],[290.000,279.800],[289.200,279.000],[289.200,278.000],[289.200,277.000],[289.000,276.800],[288.200,276.000],[288.200,275.000],[288.000,274.800],[287.200,274.000],[287.200,273.000],[287.200,272.000],[287.000,271.800],[286.200,271.000],[286.200,270.000],[286.000,269.800],[285.200,269.000],[285.200,268.000],[285.200,267.000],[285.000,266.800],[284.200,266.000],[284.200,265.000],[284.000,264.800],[283.200,264.000],[283.200,263.000],[283.200,262.000],[283.000,261.800],[282.200,261.000],[282.200,260.000],[282.000,259.800],[281.200,259.000],[281.200,258.000],[281.200,257.000],[281.000,256.800],[280.200,256.000],[280.200,255.000],[280.000,254.800],[279.200,254.000],[279.200,253.000],[279.200,252.000],[279.000,251.800],[278.200,251.000],[278.200,250.000],[278.000,249.800],[277.200,249.000],[277.200,248.000],[277.200,247.000],[277.000,246.800],[276.200,246.000],[276.200,245.000],[276.000,244.800],[275.200,244.000],[275.200,243.000],[275.200,242.000],[275.000,241.800],[274.200,241.000],[274.200,240.000],[274.000,239.800],[273.200,239.000],[273.200,238.000],[273.200,237.000],[273.000,236.800],[272.200,236.000],[272.200,235.000],[272.000,234.800],[271.200,234.000],[271.200,233.000],[271.200,232.000],[271.000,231.800],[270.200,231.000],[270.200,230.000],[270.000,229.800],[269.200,229.000],[269.200,228.000],[269.200,227.000],[269.000,226.800],[268.200,226.000],[268.200,225.000],[268.000,224.800],[267.200,224.000],[267.200,223.000],[267.200,222.000],[267.000,221.800],[266.200,221.000],[266.200,220.000],[266.000,219.800],[265.200,219.000],[265.200,218.000],[265.200,217.000],[265.000,216.800],[264.200,216.000],[264.200,215.000],[264.000,214.800],[263.200,214.000],[263.200,213.000],[263.200,212.000],[263.000,211.800],[262.200,211.000],[262.200,210.000],[262.000,209.800],[261.200,209.000],[261.200,208.000],[261.200,207.000],[261.000,206.800],[260.200,206.000],[260.200,205.000],[260.000,204.800],[259.200,204.000],[259.200,203.000],[259.200,202.000],[259.000,201.800],[258.200,201.000],[258.200,200.000],[258.000,199.800],[257.200,199.000],[257.200,198.000],[257.200,197.000],[257.000,196.800],[256.200,196.000],[256.200,195.000],[256.000,194.800],[255.200,194.000],[255.200,193.000],[255.000,192.800],[254.000,192.800],[253.000,192.800],[252.000,192.800],[251.000,192.800],[250.000,192.800],[249.200,192.000],[249.000,191.800],[248.000,191.800],[247.000,191.800],[246.000,191.800],[245.000,191.800],[244.000,191.800],[243.000,191.800],[242.000,191.800],[241.000,191.800],[240.000,191.800],[239.000,191.800],[238.000,191.800],[237.000,191.800],[236.000,191.800],[235.000,191.800],[234.000,191.800],[233.000,191.800],[232.000,191.800],[231.000,191.800],[230.000,191.800],[229.000,191.800],[228.000,191.800],[227.000,191.800],[226.000,191.800],[225.000,191.800],[224.000,191.800],[223.000,191.800],[222.800,192.000],[222.000,192.800],[221.000,192.800],[220.000,192.800],[219.000,192.800],[218.000,192.800],[217.000,192.800],[216.000,192.800],[215.000,192.800],[214.000,192.800],[213.000,192.800],[212.000,192.800],[211.000,192.800],[210.000,192.800],[209.000,192.800],[208.000,192.800],[207.000,192.800],[206.000,192.800],[205.000,192.800],[204.000,192.800],[203.000,192.800],[202.000,192.800],[201.000,192.800],[200.000,192.800],[199.000,192.800],[198.000,192.800],[197.000,192.800],[196.000,192.800],[195.000,192.800],[194.000,192.800],[193.000,192.800],[192.000,192.800],[191.000,192.800],[190.000,192.800],[189.000,192.800],[188.000,192.800],[187.000,192.800],[186.000,192.800],[185.800,193.000],[185.000,193.800],[184.000,193.800],[183.000,193.800],[182.000,193.800],[181.000,193.800],[180.000,193.800],[179.800,194.000],[179.000,194.800],[178.800,195.000],[178.800,196.000],[178.000,196.800],[177.800,197.000],[177.000,197.800],[176.800,198.000],[176.800,199.000],[176.000,199.800],[175.800,200.000],[175.000,200.800],[174.800,201.000],[174.800,202.000],[174.000,202.800],[173.800,203.000],[173.000,203.800],[172.800,204.000],[172.000,204.800],[171.800,205.000],[171.800,206.000],[171.000,206.800],[170.800,207.000],[170.000,207.800],[169.800,208.000],[169.800,209.000],[169.000,209.800],[168.800,210.000],[168.000,210.800],[167.800,211.000],[167.000,211.800],[166.800,212.000],[166.800,213.000],[166.000,213.800],[165.800,214.000],[165.000,214.800],[164.800,215.000],[164.800,216.000],[164.000,216.800],[163.800,217.000],[163.000,217.800],[162.800,218.000],[162.000,218.800],[161.800,219.000],[161.800,220.000],[161.000,220.800],[160.800,221.000],[160.000,221.800],[159.800,222.000],[159.800,223.000],[159.000,223.800],[158.800,224.000],[158.000,224.800],[157.800,225.000],[157.000,225.800],[156.800,226.000],[156.800,227.000],[156.000,227.800],[155.800,228.000],[155.000,228.800],[154.800,229.000],[154.800,230.000],[154.000,230.800],[153.800,231.000],[153.000,231.800],[152.800,232.000],[152.800,233.000],[152.000,233.800],[151.800,234.000],[151.000,234.800],[150.800,235.000],[150.000,235.800],[149.800,236.000],[149.800,237.000],[149.000,237.800],[148.800,238.000],[148.000,238.800],[147.800,239.000],[147.800,240.000],[147.000,240.800],[146.800,241.000],[146.000,241.800],[145.800,242.000],[145.000,242.800],[144.800,243.000],[144.800,244.000],[144.000,244.800],[143.800,245.000],[143.000,245.800],[142.800,246.000],[142.800,247.000],[142.000,247.800],[141.800,248.000],[141.000,248.800],[140.800,249.000],[140.000,249.800],[139.800,250.000],[139.800,251.000],[139.000,251.800],[138.800,252.000],[138.000,252.800],[137.800,253.000],[137.800,254.000],[137.000,254.800],[136.800,255.000],[136.000,255.800],[135.800,256.000],[135.800,257.000],[135.000,257.800],[134.800,258.000],[134.000,258.800],[133.800,259.000],[133.000,259.800],[132.800,260.000],[132.800,261.000],[132.000,261.800],[131.800,262.000],[131.000,262.800],[130.800,263.000],[130.800,264.000],[130.000,264.800],[129.800,265.000],[129.000,265.800],[128.800,266.000],[128.000,266.800],[127.800,267.000],[127.800,268.000],[127.000,268.800],[126.800,269.000],[126.000,269.800],[125.800,270.000],[125.800,271.000],[125.000,271.800],[124.800,272.000],[124.000,272.800],[123.800,273.000],[123.000,273.800],[122.800,274.000],[122.800,275.000],[122.000,275.800],[121.800,276.000],[121.000,276.800],[120.800,277.000],[120.800,278.000],[120.000,278.800],[119.800,279.000],[119.000,279.800],[118.800,280.000],[118.000,280.800],[117.800,281.000],[117.800,282.000],[117.000,282.800],[116.800,283.000],[116.000,283.800],[115.800,284.000],[115.800,285.000],[115.000,285.800],[114.800,286.000],[114.000,286.800],[113.800,287.000],[113.800,288.000],[113.000,288.800],[112.800,289.000],[112.000,289.800],[111.800,290.000],[111.000,290.800],[110.800,291.000],[110.800,292.000],[110.000,292.800],[109.800,293.000],[109.000,293.800],[108.800,294.000],[108.800,295.000],[108.000,295.800],[107.800,296.000],[107.000,296.800],[106.800,297.000],[106.000,297.800],[105.800,298.000],[105.800,299.000],[105.000,299.800],[104.800,300.000],[104.000,300.800],[103.800,301.000],[103.800,302.000],[103.000,302.800],[102.800,303.000],[102.000,303.800],[101.800,304.000],[101.800,305.000],[101.800,306.000],[101.800,307.000],[101.800,308.000],[102.000,308.200],[102.800,309.000],[102.800,310.000],[103.000,310.200],[103.800,311.000],[104.000,311.200],[104.800,312.000],[104.800,313.000],[105.000,313.200],[105.800,314.000],[105.800,315.000],[106.000,315.200],[106.800,316.000],[107.000,316.200],[107.800,317.000],[107.800,318.000],[108.000,318.200],[108.800,319.000],[109.000,319.200],[109.800,320.000],[109.800,321.000],[110.000,321.200],[110.800,322.000],[110.800,323.000],[111.000,323.200],[111.800,324.000],[112.000,324.200],[112.800,325.000],[112.800,326.000],[113.000,326.200],[113.800,327.000],[114.000,327.200],[114.800,328.000],[114.800,329.000],[115.000,329.200],[115.800,330.000],[115.800,331.000],[116.000,331.200],[116.800,332.000],[117.000,332.200],[117.800,333.000],[117.800,334.000],[118.000,334.200],[118.800,335.000],[119.000,335.200],[119.800,336.000],[119.800,337.000],[120.000,337.200],[120.800,338.000],[120.800,339.000],[121.000,339.200],[121.800,340.000],[122.000,340.200],[122.800,341.000],[122.800,342.000],[123.000,342.200],[123.800,343.000],[123.800,344.000],[124.000,344.200],[124.800,345.000],[125.000,345.200],[125.800,346.000],[125.800,347.000],[126.000,347.200],[126.800,348.000],[127.000,348.200],[127.800,349.000],[127.800,350.000],[128.000,350.200],[128.800,351.000],[128.800,352.000],[129.000,352.200],[129.800,353.000],[130.000,353.200],[130.800,354.000],[130.800,355.000],[131.000,355.200],[131.800,356.000],[132.000,356.200],[132.800,357.000],[132.800,358.000],[133.000,358.200],[133.800,359.000],[133.800,360.000],[134.000,360.200],[134.800,361.000],[135.000,361.200],[135.800,362.000],[135.800,363.000],[136.000,363.200],[136.800,364.000],[136.800,365.000],[137.000,365.200],[137.800,366.000],[138.000,366.200],[138.800,367.000],[138.800,368.000],[139.000,368.200],[139.800,369.000],[140.000,369.200],[140.800,370.000],[140.800,371.000],[141.000,371.200],[141.800,372.000],[141.800,373.000],[142.000,373.200],[142.800,374.000],[143.000,374.200],[143.800,375.000],[143.800,376.000],[144.000,376.200],[144.800,377.000],[145.000,377.200],[145.800,378.000],[145.800,379.000],[146.000,379.200],[146.800,380.000],[146.800,381.000],[147.000,381.200],[147.800,382.000],[148.000,382.200],[148.800,383.000],[148.800,384.000],[149.000,384.200],[149.800,385.000],[150.000,385.200],[150.800,386.000],[150.800,387.000],[151.000,387.200],[151.800,388.000],[151.800,389.000],[152.000,389.200],[152.800,390.000],[153.000,390.200],[153.800,391.000],[153.800,392.000],[154.000,392.200],[154.800,393.000],[154.800,394.000],[155.000,394.200],[155.800,395.000],[156.000,395.200],[156.800,396.000],[156.800,397.000],[157.000,397.200],[157.800,398.000],[158.000,398.200],[158.800,399.000],[158.800,400.000],[159.000,400.200],[159.800,401.000],[159.800,402.000],[160.000,402.200],[160.800,403.000],[161.000,403.200],[161.800,404.000],[161.800,405.000],[162.000,405.200],[162.800,406.000],[163.000,406.200],[163.800,407.000],[163.800,408.000],[164.000,408.200],[164.800,409.000],[164.800,410.000],[165.000,410.200],[165.800,411.000],[166.000,411.200],[166.800,412.000],[166.800,413.000],[167.000,413.200],[167.800,414.000],[167.800,415.000],[168.000,415.200],[168.800,416.000],[169.000,416.200],[169.800,417.000],[169.800,418.000],[170.000,418.200],[170.800,419.000],[171.000,419.200],[171.800,420.000],[171.800,421.000],[172.000,421.200],[172.800,422.000],[172.800,423.000],[173.000,423.200],[173.800,424.000],[174.000,424.200],[174.800,425.000],[174.800,426.000],[175.000,426.200],[175.800,427.000],[176.000,427.200],[176.800,428.000],[176.800,429.000],[177.000,429.200],[177.800,430.000],[177.800,431.000],[178.000,431.200],[178.800,432.000],[179.000,432.200],[179.800,433.000],[179.800,434.000],[180.000,434.200],[180.800,435.000],[181.000,435.200],[181.800,436.000],[181.800,437.000],[182.000,437.200],[182.800,438.000],[182.800,439.000],[183.000,439.200],[183.800,440.000],[184.000,440.200],[184.800,441.000],[184.800,442.000],[185.000,442.200],[185.800,443.000],[185.800,444.000],[186.000,444.200],[186.800,445.000],[187.000,445.200],[187.800,446.000],[187.800,447.000],[188.000,447.200],[188.800,448.000],[189.000,448.200],[189.800,449.000],[189.800,450.000],[190.000,450.200],[190.800,451.000],[190.800,452.000],[191.000,452.200],[191.800,453.000],[192.000,453.200],[192.800,454.000],[192.800,455.000],[193.000,455.200],[193.800,456.000],[194.000,456.200],[194.800,457.000],[194.800,458.000],[195.000,458.200],[195.800,459.000],[195.800,460.000],[196.000,460.200],[196.800,461.000],[197.000,461.200],[197.800,462.000],[197.800,463.000],[198.000,463.200],[198.800,464.000],[199.000,464.200],[199.800,465.000],[199.800,466.000],[200.000,466.200],[200.800,467.000],[200.800,468.000],[201.000,468.200],[201.800,469.000],[202.000,469.200],[202.800,470.000],[202.800,471.000],[203.000,471.200],[203.800,472.000],[203.800,473.000],[204.000,473.200],[204.800,474.000],[205.000,474.200],[205.800,475.000],[205.800,476.000],[206.000,476.200],[206.800,477.000],[207.000,477.200],[207.800,478.000],[207.800,479.000],[208.000,479.200],[208.800,480.000],[208.800,481.000],[209.000,481.200],[209.800,482.000],[210.000,482.200],[210.800,483.000],[210.800,484.000],[211.000,484.200],[211.800,485.000],[212.000,485.200],[212.800,486.000],[212.800,487.000],[213.000,487.200],[214.000,487.200],[215.000,487.200],[216.000,487.200],[217.000,487.200],[218.000,487.200],[219.000,487.200],[219.200,487.000],[220.000,486.200],[221.000,486.200],[222.000,486.200],[223.000,486.200],[223.200,486.000],[224.000,485.200],[225.000,485.200],[226.000,485.200],[227.000,485.200],[227.200,485.000],[228.000,484.200],[229.000,484.200],[230.000,484.200],[231.000,484.200],[231.200,484.000],[232.000,483.200],[233.000,483.200],[234.000,483.200],[235.000,483.200],[235.200,483.000],[236.000,482.200],[237.000,482.200],[238.000,482.200],[239.000,482.200],[239.200,482.000],[240.000,481.200],[241.000,481.200],[242.000,481.200],[242.200,481.000],[243.000,480.200],[244.000,480.200],[245.000,480.200],[246.000,480.200],[246.200,480.000],[247.000,479.200],[248.000,479.200],[249.000,479.200],[250.000,479.200],[250.200,479.000],[251.000,478.200],[252.000,478.200],[253.000,478.200],[254.000,478.200],[254.200,478.000],[255.000,477.200],[256.000,477.200],[257.000,477.200],[258.000,477.200],[258.200,477.000],[259.000,476.200],[260.000,476.200],[261.000,476.200],[262.000,476.200],[262.200,476.000],[263.000,475.200],[264.000,475.200],[265.000,475.200],[266.000,475.200],[266.200,475.000],[267.000,474.200],[268.000,474.200],[269.000,474.200],[270.000,474.200],[270.200,474.000],[271.000,473.200],[272.000,473.200],[273.000,473.200],[274.000,473.200],[274.200,473.000],[275.000,472.200],[276.000,472.200],[277.000,472.200],[278.000,472.200],[278.200,472.000],[279.000,471.200],[280.000,471.200],[281.000,471.200],[282.000,471.200],[282.200,471.000],[283.000,470.200],[284.000,470.200],[285.000,470.200],[286.000,470.200],[286.200,470.000],[287.000,469.200],[288.000,469.200],[289.000,469.200],[290.000,469.200],[290.200,469.000],[291.000,468.200],[292.000,468.200],[293.000,468.200],[294.000,468.200],[294.200,468.000],[295.000,467.200],[296.000,467.200],[297.000,467.200],[298.000,467.200],[298.200,467.000],[299.000,466.200],[300.000,466.200],[301.000,466.200],[302.000,466.200],[302.200,466.000],[303.000,465.200],[304.000,465.200],[305.000,465.200],[306.000,465.200],[306.200,465.000],[307.000,464.200],[308.000,464.200],[309.000,464.200],[309.200,464.000],[310.000,463.200],[311.000,463.200],[312.000,463.200],[313.000,463.200],[313.200,463.000],[314.000,462.200],[315.000,462.200],[316.000,462.200],[317.000,462.200],[317.200,462.000],[318.000,461.200],[319.000,461.200],[320.000,461.200],[321.000,461.200],[321.200,461.000],[322.000,460.200],[323.000,460.200],[324.000,460.200],[325.000,460.200],[325.200,460.000],[326.000,459.200],[327.000,459.200],[328.000,459.200],[329.000,459.200],[329.200,459.000],[330.000,458.200],[331.000,458.200],[332.000,458.200],[333.000,458.200],[333.200,458.000],[334.000,457.200],[335.000,457.200],[336.000,457.200],[337.000,457.200],[337.200,457.000],[338.000,456.200],[339.000,456.200],[340.000,456.200],[341.000,456.200],[341.200,456.000],[342.000,455.200],[343.000,455.200],[344.000,455.200],[345.000,455.200],[345.200,455.000],[346.000,454.200],[347.000,454.200],[348.000,454.200],[349.000,454.200],[349.200,454.000],[350.000,453.200],[351.000,453.200],[352.000,453.200],[353.000,453.200],[353.200,453.000],[354.000,452.200],[355.000,452.200],[356.000,452.200],[357.000,452.200],[357.200,452.000],[358.000,451.200],[359.000,451.200],[360.000,451.200],[361.000,451.200],[361.200,451.000],[362.000,450.200],[363.000,450.200],[364.000,450.200],[365.000,450.200],[365.200,450.000],[366.000,449.200],[367.000,449.200],[368.000,449.200],[369.000,449.200],[369.200,449.000],[370.000,448.200],[371.000,448.200],[372.000,448.200],[373.000,448.200],[373.200,448.000],[374.000,447.200],[375.000,447.200],[376.000,447.200],[376.200,447.000],[377.000,446.200],[378.000,446.200],[379.000,446.200],[380.000,446.200],[380.200,446.000],[381.000,445.200],[382.000,445.200],[383.000,445.200],[384.000,445.200],[384.200,445.000],[385.000,444.200],[386.000,444.200],[387.000,444.200],[388.000,444.200],[388.200,444.000],[389.000,443.200],[390.000,443.200],[391.000,443.200],[392.000,443.200],[392.200,443.000],[393.000,442.200],[394.000,442.200],[395.000,442.200],[396.000,442.200],[396.200,442.000],[397.000,441.200],[398.000,441.200],[399.000,441.200],[400.000,441.200],[400.200,441.000],[401.000,440.200],[402.000,440.200],[403.000,440.200],[404.000,440.200],[404.200,440.000],[405.000,439.200],[406.000,439.200],[407.000,439.200],[408.000,439.200],[408.200,439.000],[409.000,438.200],[410.000,438.200],[411.000,438.200],[412.000,438.200],[412.200,438.000],[413.000,437.200],[414.000,437.200],[414.200,437.000]];
    
    
render() linear_extrude(height=(height)) thicknessoffset(cookieOutline,thickness=width);
render() linear_extrude(height=handleThickness) thicknessoffset(cookieOutline,thickness=handleWidth,bidirectional=true);

