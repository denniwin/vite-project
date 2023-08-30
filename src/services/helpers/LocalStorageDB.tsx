export default class LocalStorageDB {
    public static write(name: string, data: string[]): void {
        try {
          sessionStorage.setItem(name, JSON.stringify(data));
        } catch (error) {
          console.error("Error writing to sessionStorage:", error);
        }
      }
  
    public static read(data: string): string[] {
        const rawData = sessionStorage.getItem(data);
    
        if (rawData) {
          try {
            const array = JSON.parse(rawData);
            if (Array.isArray(array)) {
              return array;
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
    
        return [];
      }
    
}